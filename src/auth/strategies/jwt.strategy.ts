import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthTokenPayload } from '../types';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from 'src/configs/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  AuthConfig.AuthTokenKey,
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userName, userId }: AuthTokenPayload) {
    return {
      userId,
      userName,
    };
  }
}
