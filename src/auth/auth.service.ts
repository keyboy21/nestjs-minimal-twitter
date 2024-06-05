import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { registerUserDto } from './dto/register.dto';
import { AuthTokenPayload } from './types';
import { loginUserDto } from './dto/login.dto';
import { verify } from '@node-rs/argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private pisma: PrismaService,
    private usersService: UsersService,
  ) {}

  public async register(payload: registerUserDto) {
    const userAlreadyExist = await this.pisma.user.findUnique({
      where: {
        userName: payload.userName,
        email: payload.email,
      },
    });

    if (userAlreadyExist)
      throw new BadRequestException(
        'User with this email or userName already exist',
      );

    const newUser = await this.usersService.createUser(payload);

    const token = await this.generateToken({
      sub: newUser.id,
      userName: newUser.userName,
    });

    return token;
  }

  public async login(
    payload: loginUserDto,
  ): Promise<
    { accesToken: string; refreshToken: string } | BadRequestException
  > {
    const findUserByUserName = await this.usersService.findUserByUserName(
      payload.userName,
    );

    if (!findUserByUserName) return new BadRequestException('User not found');

    const verifyPassword = await verify(
      findUserByUserName.password,
      payload.password,
    );

    if (!verifyPassword) return new BadRequestException('Wrong password');

    const tokens = await this.generateToken({
      sub: findUserByUserName.id,
      userName: findUserByUserName.userName,
    });

    return tokens;
  }

  public async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verify(refreshToken);

    if (!payload) return new BadRequestException('Invalid refresh token');

    const user = await this.pisma.user.findUnique({
      where: { userName: payload.userName },
    });

    if (!user) return new UnauthorizedException('User not found');

    const tokens = await this.generateToken({
      sub: user.id,
      userName: user.userName,
    });

    return tokens;
  }

  private async generateToken(payload: AuthTokenPayload) {
    const accesToken = this.jwtService.sign(payload, { expiresIn: '2d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    return { accesToken, refreshToken };
  }
}
