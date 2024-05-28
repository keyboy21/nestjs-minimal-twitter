import { BadRequestException, Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { RegisterUserDto, registersSchema } from './dto/register.dto';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { LoginUserDto, loginSchema } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterEntity } from './entities/register.entity';
import { LoginEntity } from './entities/login.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) { }

  @Post('/register')
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: RegisterEntity })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: RegisterEntity
  })
  @UsePipes(new ZodValidationPipe(registersSchema))
  public async regiser(@Body() body: RegisterUserDto): Promise<RegisterUserDto | BadRequestException> {
    const user = await this.authService.register(body)

    return user
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginEntity })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(loginSchema))
  public async login(@Body() body: LoginUserDto) {
    return {
      acces_token: this.jwtService.sign(body),
    };
  }
}
