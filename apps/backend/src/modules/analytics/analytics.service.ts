import { Injectable, Logger, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { Post, ViewLog } from '../../database/entities';
import { REDIS_KEYS, RATE_LIMITS, QUEUE_NAMES, JOB_NAMES } from '../../common/constants';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(ViewLog)
    private readonly viewLogRepository: Repository<ViewLog>,
    @InjectQueue(QUEUE_NAMES.analytics)
    private readonly analyticsQueue: Queue,
    private readonly redis: Redis,
  ) {}

  async trackView(
    postId: string,
    fingerprint: string,
    ipAddress: string,
    userAgent: string,
    referer?: string,
  ): Promise<{ tracked: boolean; views: number }> {
    const cooldownKey = REDIS_KEYS.visitorCooldown(postId, fingerprint);
    const alreadyVisited = await this.redis.get(cooldownKey);

    if (alreadyVisited) {
      const currentViews = await this.redis.get(REDIS_KEYS.postViews(postId));
      return { tracked: false, views: parseInt(currentViews || '0', 10) };
    }

    await this.redis.setex(cooldownKey, RATE_LIMITS.viewCooldownSeconds, '1');

    const pipeline = this.redis.pipeline();
    pipeline.incr(REDIS_KEYS.postViews(postId));
    const today = new Date().toISOString().split('T')[0];
    pipeline.incr(REDIS_KEYS.postDailyViews(postId, today));
    const results = await pipeline.exec();

    const newViews = results?.[0]?.[1] as number;

    await this.analyticsQueue.add(JOB_NAMES.recordView, {
      postId,
      fingerprint,
      ipAddress,
      userAgent,
      referer,
      isBuffed: false,
    });

    return { tracked: true, views: newViews };
  }

  async buffViews(
    postId: string,
    amount: number,
    adminId: string,
  ): Promise<{ success: boolean; newTotal: number }> {
    if (amount < RATE_LIMITS.buffMinAmount || amount > RATE_LIMITS.buffMaxAmount) {
      throw new BadRequestException(
        `Amount must be between ${RATE_LIMITS.buffMinAmount} and ${RATE_LIMITS.buffMaxAmount}`,
      );
    }

    const buffKey = REDIS_KEYS.buffRateLimit(adminId);
    const buffCount = await this.redis.incr(buffKey);

    if (buffCount === 1) {
      await this.redis.expire(buffKey, RATE_LIMITS.buffWindowSeconds);
    }

    if (buffCount > RATE_LIMITS.maxBuffsPerHour) {
      throw new ForbiddenException('Buff rate limit exceeded. Try again later.');
    }

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new BadRequestException('Post not found');

    const newTotal = await this.redis.incrby(REDIS_KEYS.postViews(postId), amount);

    const today = new Date().toISOString().split('T')[0];
    await this.redis.incrby(REDIS_KEYS.postDailyViews(postId, today), amount);

    this.logger.warn(
      `BUFF: Admin ${adminId} buffed post ${postId} by ${amount} views. New total: ${newTotal}`,
    );

    await this.analyticsQueue.add(JOB_NAMES.recordView, {
      postId,
      fingerprint: `buff-${adminId}-${Date.now()}`,
      ipAddress: 'system',
      userAgent: 'buff-system',
      referer: null,
      isBuffed: true,
      buffAmount: amount,
    });

    return { success: true, newTotal };
  }

  async getPostViews(postId: string): Promise<number> {
    const cached = await this.redis.get(REDIS_KEYS.postViews(postId));
    if (cached) return parseInt(cached, 10);

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) return 0;

    await this.redis.set(REDIS_KEYS.postViews(postId), post.views.toString());
    return post.views;
  }

  async getPostAnalytics(postId: string) {
    const [views, uniqueVisitors, dailyBreakdown] = await Promise.all([
      this.getPostViews(postId),
      this.viewLogRepository
        .createQueryBuilder('vl')
        .select('COUNT(DISTINCT vl.visitor_fingerprint)', 'count')
        .where('vl.post_id = :postId', { postId })
        .andWhere('vl.is_buffed = false')
        .getRawOne()
        .then((r) => parseInt(r?.count || '0', 10)),
      this.getLast30DaysViews(postId),
    ]);

    return { postId, views, uniqueVisitors, dailyBreakdown };
  }

  private async getLast30DaysViews(postId: string): Promise<Record<string, number>> {
    const result: Record<string, number> = {};
    const today = new Date();

    const keys: string[] = [];
    const dates: string[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dates.push(dateStr);
      keys.push(REDIS_KEYS.postDailyViews(postId, dateStr));
    }

    const values = await this.redis.mget(...keys);

    dates.forEach((date, index) => {
      result[date] = parseInt(values[index] || '0', 10);
    });

    return result;
  }

  async syncRedisToPostgres(): Promise<void> {
    this.logger.log('Syncing Redis view counts to PostgreSQL...');

    const posts = await this.postRepository.find({ select: ['id'] });

    for (const post of posts) {
      const cachedViews = await this.redis.get(REDIS_KEYS.postViews(post.id));
      if (cachedViews) {
        const views = parseInt(cachedViews, 10);
        await this.postRepository.update(post.id, { views });
      }
    }

    this.logger.log(`Synced view counts for ${posts.length} posts`);
  }
}
