import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'bullmq';
import { ViewLog } from '../../database/entities';
import { QUEUE_NAMES, JOB_NAMES } from '../../common/constants';

interface RecordViewPayload {
  postId: string;
  fingerprint: string;
  ipAddress: string;
  userAgent: string;
  referer: string | null;
  isBuffed: boolean;
  buffAmount?: number;
}

@Processor(QUEUE_NAMES.analytics)
export class AnalyticsProcessor extends WorkerHost {
  private readonly logger = new Logger(AnalyticsProcessor.name);

  constructor(
    @InjectRepository(ViewLog)
    private readonly viewLogRepository: Repository<ViewLog>,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case JOB_NAMES.recordView:
        await this.handleRecordView(job.data as RecordViewPayload);
        break;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }

  private async handleRecordView(payload: RecordViewPayload): Promise<void> {
    try {
      if (payload.isBuffed && payload.buffAmount) {
        const logs = Array.from({ length: Math.min(payload.buffAmount, 100) }, () =>
          this.viewLogRepository.create({
            postId: payload.postId,
            visitorFingerprint: payload.fingerprint,
            ipAddress: payload.ipAddress,
            userAgent: payload.userAgent,
            referer: payload.referer,
            isBuffed: true,
          }),
        );
        await this.viewLogRepository.save(logs);
      } else {
        const viewLog = this.viewLogRepository.create({
          postId: payload.postId,
          visitorFingerprint: payload.fingerprint,
          ipAddress: payload.ipAddress,
          userAgent: payload.userAgent,
          referer: payload.referer,
          isBuffed: payload.isBuffed,
        });
        await this.viewLogRepository.save(viewLog);
      }
    } catch (error) {
      this.logger.error(`Failed to record view for post ${payload.postId}`, error);
      throw error;
    }
  }
}
