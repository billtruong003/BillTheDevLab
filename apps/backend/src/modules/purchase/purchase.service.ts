import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Product, Purchase, User } from '../../database/entities';
import { PurchaseStatus } from '@billthedevlab/shared-types';

@Injectable()
export class PurchaseService {
  private readonly logger = new Logger(PurchaseService.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('stripe.secretKey')!, {
      apiVersion: '2024-09-30.acacia',
    });
  }

  async createCheckoutSession(
    productId: string,
    userId: string,
  ): Promise<{ sessionId: string; url: string }> {
    const product = await this.productRepository.findOne({
      where: { id: productId, isActive: true },
    });

    if (!product) throw new NotFoundException('Product not found');

    if (Number(product.price) === 0) {
      throw new BadRequestException('This product is free. No checkout required.');
    }

    const existingPurchase = await this.purchaseRepository.findOne({
      where: { productId, userId, status: PurchaseStatus.COMPLETED },
    });

    if (existingPurchase) {
      throw new BadRequestException('You already own this product');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.displayName,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await this.userRepository.update(user.id, { stripeCustomerId: customerId });
    }

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: Math.round(Number(product.price) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
        userId: user.id,
      },
      success_url: `${this.configService.get<string>('stripe.successUrl')}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: this.configService.get<string>('stripe.cancelUrl'),
    });

    await this.purchaseRepository.save(
      this.purchaseRepository.create({
        userId,
        productId,
        amountPaid: Number(product.price),
        status: PurchaseStatus.PENDING,
        stripeSessionId: session.id,
      }),
    );

    return { sessionId: session.id, url: session.url! };
  }

  async handleWebhook(signature: string, rawBody: Buffer): Promise<void> {
    const webhookSecret = this.configService.get<string>('stripe.webhookSecret')!;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      this.logger.error('Webhook signature verification failed', error);
      throw new BadRequestException('Invalid webhook signature');
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'checkout.session.expired':
        await this.handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const { productId, userId } = session.metadata || {};

    if (!productId || !userId) {
      this.logger.error('Missing metadata in checkout session');
      return;
    }

    await this.purchaseRepository.update(
      { stripeSessionId: session.id },
      { status: PurchaseStatus.COMPLETED },
    );

    this.logger.log(`Purchase completed: user=${userId}, product=${productId}`);
  }

  private async handleCheckoutExpired(session: Stripe.Checkout.Session): Promise<void> {
    await this.purchaseRepository.update(
      { stripeSessionId: session.id },
      { status: PurchaseStatus.FAILED },
    );
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: { userId, status: PurchaseStatus.COMPLETED },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }

  async hasPurchased(userId: string, productId: string): Promise<boolean> {
    const purchase = await this.purchaseRepository.findOne({
      where: { userId, productId, status: PurchaseStatus.COMPLETED },
    });
    return !!purchase;
  }
}
