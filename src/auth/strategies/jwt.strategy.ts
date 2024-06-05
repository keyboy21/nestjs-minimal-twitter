import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthTokenPayload } from '../types';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from 'src/configs/auth.config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  AuthConfig.AuthTokenKey,
) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userName, sub }: AuthTokenPayload) {
    if (!userName || !sub) return new UnauthorizedException('User not found');

    const user = await this.userService.validateUser({ userName, sub });

    if (user === null) return new UnauthorizedException('User not found');

    return user;
  }
}
