import { AuthGuard as PAuthGuard } from '@nestjs/passport';
import { AuthConfig } from '../../configs/auth.config';

export class AuthGuard extends PAuthGuard(AuthConfig.AuthTokenKey) {}
