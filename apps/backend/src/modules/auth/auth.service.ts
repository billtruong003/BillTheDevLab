import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities';
import { UserRole } from '@billthedevlab/shared-types';
import { JwtPayload } from '../../common/interfaces';

interface OAuthProfile {
  email: string;
  displayName: string;
  avatarUrl: string | null;
  provider: string;
  providerId: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: OAuthProfile): Promise<{ accessToken: string; user: User }> {
    let user = await this.userRepository.findOne({
      where: { provider: profile.provider, providerId: profile.providerId },
    });

    if (!user) {
      user = await this.userRepository.findOne({ where: { email: profile.email } });

      if (user) {
        user.provider = profile.provider;
        user.providerId = profile.providerId;
        user.avatarUrl = profile.avatarUrl ?? user.avatarUrl;
        await this.userRepository.save(user);
      } else {
        user = this.userRepository.create({
          email: profile.email,
          displayName: profile.displayName,
          avatarUrl: profile.avatarUrl,
          provider: profile.provider,
          providerId: profile.providerId,
          role: UserRole.MEMBER,
        });
        await this.userRepository.save(user);
      }
    }

    const accessToken = await this.generateToken(user);
    return { accessToken, user };
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
