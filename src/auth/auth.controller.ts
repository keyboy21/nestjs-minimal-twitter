import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { registerUserDto, registersSchema } from './dto/register.dto';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { loginUserDto, loginSchema, myOpenApiSchema } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { refreshTokenDto, refreshTokenSchema } from './dto/refreshToken.dto';
import { RegisterResponse } from './responses/register';
import { LoginResponse } from './responses/login';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: RegisterResponse })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: RegisterResponse,
  })
  @UsePipes(new ZodValidationPipe(registersSchema))
  public async regiser(@Body() body: registerUserDto) {
    return await this.authService.register(body);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: myOpenApiSchema,
  })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  @UsePipes(new ZodValidationPipe(loginSchema))
  public async login(@Body() body: loginUserDto) {
    return await this.authService.login(body);
  }

  @Post('/refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  @UseGuards(AuthGuard)
  public async refreshRToken(@Body() body: refreshTokenDto) {
    return await this.authService.refreshToken(body.refreshToken);
  }
}
