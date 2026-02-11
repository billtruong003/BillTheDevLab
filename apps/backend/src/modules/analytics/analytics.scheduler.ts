import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AnalyticsService } from './analytics.service';
import { GoogleSheetsService } from './google-sheets.service';

@Injectable()
export class AnalyticsScheduler {
  private readonly logger = new Logger(AnalyticsScheduler.name);

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly googleSheetsService: GoogleSheetsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlySync(): Promise<void> {
    this.logger.log('Running hourly Redis→PostgreSQL sync');
    await this.analyticsService.syncRedisToPostgres();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailySheetSync(): Promise<void> {
    this.logger.log('Running daily Google Sheets sync');
    await this.googleSheetsService.syncDailyAnalytics();
  }
}
