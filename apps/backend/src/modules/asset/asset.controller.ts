import { Controller, Get, Param, Req } from '@nestjs/common';
import { AssetSecurityService } from './asset-security.service';
import { Public } from '../../common/decorators';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetSecurityService: AssetSecurityService) {}

  @Get('download/:fileKey(*)')
  @Public()
  async download(
    @Param('fileKey') fileKey: string,
    @Req() request: { user?: { sub: string } },
  ) {
    const userId = request.user?.sub || null;
    const result = await this.assetSecurityService.generateSecureDownloadUrl(fileKey, userId);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }
}
