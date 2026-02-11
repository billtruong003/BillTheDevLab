import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsProcessor } from './analytics.processor';
import { AnalyticsScheduler } from './analytics.scheduler';
import { GoogleSheetsService } from './google-sheets.service';
import { Post, ViewLog, Purchase } from '../../database/entities';
import { QUEUE_NAMES } from '../../common/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, ViewLog, Purchase]),
    BullModule.registerQueue({ name: QUEUE_NAMES.analytics }),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsProcessor, AnalyticsScheduler, GoogleSheetsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
