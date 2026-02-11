import { Controller, Post, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, CurrentUser } from '../../common/decorators';
import { JwtPayload } from '../../common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth/callback')
  @Public()
  @HttpCode(HttpStatus.OK)
  async oauthCallback(
    @Body()
    body: {
      email: string;
      displayName: string;
      avatarUrl: string | null;
      provider: string;
      providerId: string;
    },
  ) {
    const result = await this.authService.validateOAuthLogin(body);
    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        user: {
          id: result.user.id,
          email: result.user.email,
          displayName: result.user.displayName,
          avatarUrl: result.user.avatarUrl,
          role: result.user.role,
          isSubscribed: result.user.isSubscribed,
        },
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('me')
  async getProfile(@CurrentUser() user: JwtPayload) {
    const fullUser = await this.authService.findUserById(user.sub);
    return {
      success: true,
      data: {
        id: fullUser.id,
        email: fullUser.email,
        displayName: fullUser.displayName,
        avatarUrl: fullUser.avatarUrl,
        role: fullUser.role,
        isSubscribed: fullUser.isSubscribed,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
