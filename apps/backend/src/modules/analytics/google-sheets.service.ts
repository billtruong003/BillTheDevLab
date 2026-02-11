import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google, sheets_v4 } from 'googleapis';
import { Post, Purchase } from '../../database/entities';

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private sheets: sheets_v4.Sheets | null = null;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {
    this.initializeClient();
  }

  private initializeClient(): void {
    const email = this.configService.get<string>('google.serviceAccountEmail');
    const privateKey = this.configService.get<string>('google.privateKey');

    if (!email || !privateKey) {
      this.logger.warn('Google Sheets credentials not configured. Sync disabled.');
      return;
    }

    const auth = new google.auth.JWT(email, undefined, privateKey, [
      'https://www.googleapis.com/auth/spreadsheets',
    ]);

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async syncDailyAnalytics(): Promise<void> {
    if (!this.sheets) {
      this.logger.warn('Google Sheets not initialized. Skipping sync.');
      return;
    }

    const spreadsheetId = this.configService.get<string>('google.spreadsheetId');
    const sheetName = this.configService.get<string>('google.sheetName');

    if (!spreadsheetId) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const posts = await this.postRepository.find({
        select: ['id', 'title', 'views', 'slug'],
        order: { views: 'DESC' },
      });

      const rows = await Promise.all(
        posts.map(async (post) => {
          const uniqueVisitors = await this.getUniqueVisitorCount(post.id);
          const { downloads, revenue } = await this.getProductStats(post.id);
          return [post.id, post.title, post.views, uniqueVisitors, downloads, revenue, today];
        }),
      );

      await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:G`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: rows },
      });

      this.logger.log(`Synced ${rows.length} posts to Google Sheets`);
    } catch (error) {
      this.logger.error('Google Sheets sync failed', error);
      throw error;
    }
  }

  private async getUniqueVisitorCount(postId: string): Promise<number> {
    const result = await this.postRepository.query(
      `SELECT COUNT(DISTINCT visitor_fingerprint) as count FROM view_logs WHERE post_id = $1 AND is_buffed = false`,
      [postId],
    );
    return parseInt(result[0]?.count || '0', 10);
  }

  private async getProductStats(
    postId: string,
  ): Promise<{ downloads: number; revenue: number }> {
    const result = await this.purchaseRepository
      .createQueryBuilder('p')
      .select('SUM(p.download_count)', 'downloads')
      .addSelect('SUM(p.amount_paid)', 'revenue')
      .innerJoin('p.product', 'product')
      .where('product.post_id = :postId', { postId })
      .andWhere('p.status = :status', { status: 'completed' })
      .getRawOne();

    return {
      downloads: parseInt(result?.downloads || '0', 10),
      revenue: parseFloat(result?.revenue || '0'),
    };
  }
}
