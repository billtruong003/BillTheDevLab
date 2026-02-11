import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Redis from 'ioredis';
import { Product, Purchase } from '../../database/entities';
import { PurchaseStatus } from '@billthedevlab/shared-types';
import { REDIS_KEYS, RATE_LIMITS } from '../../common/constants';

@Injectable()
export class AssetSecurityService {
  private readonly logger = new Logger(AssetSecurityService.name);
  private readonly s3Client: S3Client;
  private readonly privateBucket: string;
  private readonly signedUrlExpiry: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly redis: Redis,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('aws.region')!,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey')!,
      },
    });
    this.privateBucket = this.configService.get<string>('aws.s3PrivateBucket')!;
    this.signedUrlExpiry = this.configService.get<number>('aws.signedUrlExpiry')!;
  }

  async generateSecureDownloadUrl(
    fileKey: string,
    userId: string | null,
  ): Promise<{ url: string; expiresIn: number; fileName: string }> {
    await this.enforceRateLimit(userId || 'anonymous');

    const product = await this.productRepository.findOne({
      where: { fileKey, isActive: true },
    });

    if (!product) throw new NotFoundException('Product not found');

    await this.verifyAccess(product, userId);
    await this.verifyFileExists(fileKey);

    const url = await this.createSignedUrl(fileKey);
    const fileName = fileKey.split('/').pop() || 'download';

    if (userId) {
      await this.recordDownload(product.id, userId);
    }

    return { url, expiresIn: this.signedUrlExpiry, fileName };
  }

  private async verifyAccess(product: Product, userId: string | null): Promise<void> {
    const isFree = Number(product.price) === 0;

    if (isFree) return;

    if (!userId) {
      throw new ForbiddenException('Authentication required for paid products');
    }

    const purchase = await this.purchaseRepository.findOne({
      where: {
        productId: product.id,
        userId,
        status: PurchaseStatus.COMPLETED,
      },
    });

    if (!purchase) {
      throw new ForbiddenException('Purchase required to download this product');
    }
  }

  private async verifyFileExists(fileKey: string): Promise<void> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({ Bucket: this.privateBucket, Key: fileKey }),
      );
    } catch {
      this.logger.error(`File not found in S3: ${fileKey}`);
      throw new NotFoundException('File not found');
    }
  }

  private async createSignedUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.privateBucket,
      Key: fileKey,
      ResponseContentDisposition: `attachment; filename="${fileKey.split('/').pop()}"`,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: this.signedUrlExpiry });
  }

  private async enforceRateLimit(userId: string): Promise<void> {
    const key = REDIS_KEYS.downloadRateLimit(userId);
    const current = await this.redis.incr(key);

    if (current === 1) {
      await this.redis.expire(key, RATE_LIMITS.downloadWindowSeconds);
    }

    if (current > RATE_LIMITS.maxDownloadsPerMinute) {
      throw new BadRequestException('Download rate limit exceeded. Please wait a moment.');
    }
  }

  private async recordDownload(productId: string, userId: string): Promise<void> {
    await this.purchaseRepository.update(
      { productId, userId, status: PurchaseStatus.COMPLETED },
      { downloadCount: () => 'download_count + 1', lastDownloadedAt: new Date() },
    );
  }
}
