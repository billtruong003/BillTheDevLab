import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Public, Roles, CurrentUser, ClientIp, UserAgent } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { JwtPayload } from '../../common/interfaces';
import { UserRole, ViewTrackPayload, BuffViewPayload } from '@billthedevlab/shared-types';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('view/:postId')
  @Public()
  @HttpCode(HttpStatus.OK)
  async trackView(
    @Param('postId') postId: string,
    @Body() body: ViewTrackPayload,
    @ClientIp() ipAddress: string,
    @UserAgent() userAgent: string,
  ) {
    const result = await this.analyticsService.trackView(
      postId,
      body.fingerprint,
      ipAddress,
      userAgent,
      body.referrer,
    );
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('buff-view')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  async buffViews(
    @Body() body: BuffViewPayload,
    @CurrentUser() user: JwtPayload,
  ) {
    const result = await this.analyticsService.buffViews(body.postId, body.amount, user.sub);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('post/:postId')
  @Public()
  async getPostAnalytics(@Param('postId') postId: string) {
    const data = await this.analyticsService.getPostAnalytics(postId);
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('views/:postId')
  @Public()
  async getViews(@Param('postId') postId: string) {
    const views = await this.analyticsService.getPostViews(postId);
    return {
      success: true,
      data: { views },
      timestamp: new Date().toISOString(),
    };
  }
}
