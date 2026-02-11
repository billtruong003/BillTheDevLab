import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Public, CurrentUser } from '../../common/decorators';
import { JwtPayload } from '../../common/interfaces';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('checkout')
  @HttpCode(HttpStatus.OK)
  async createCheckout(
    @Body() body: { productId: string },
    @CurrentUser() user: JwtPayload,
  ) {
    const result = await this.purchaseService.createCheckoutSession(body.productId, user.sub);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('webhook')
  @Public()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: { rawBody: Buffer },
  ) {
    await this.purchaseService.handleWebhook(signature, request.rawBody);
    return { received: true };
  }

  @Get('my')
  async getMyPurchases(@CurrentUser() user: JwtPayload) {
    const purchases = await this.purchaseService.getUserPurchases(user.sub);
    return {
      success: true,
      data: purchases,
      timestamp: new Date().toISOString(),
    };
  }
}
