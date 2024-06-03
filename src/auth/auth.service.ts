import { BadRequestException, Injectable } from '@nestjs/common';
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

  public async register(
    payload: registerUserDto,
  ): Promise<registerUserDto | BadRequestException> {
    const emailExist = await this.usersService.findUserByEmail(payload.email);

    if (emailExist)
      return new BadRequestException('User with this email already exist');

    const userNameExist = await this.usersService.findUserByUserName(
      payload.userName,
    );

    if (userNameExist)
      return new BadRequestException('User with this userName already exist ');

    return this.usersService.createUser(payload);
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

    const { accesToken, refreshToken } = await this.generateToken({
      userId: findUserByUserName.id,
      userName: findUserByUserName.userName,
    });

    return { accesToken, refreshToken };
  }

  private async generateToken(payload: AuthTokenPayload) {
    if (!payload) {
      throw new Error('Payload is missing');
    }

    const accesToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    if (!accesToken) {
      throw new Error('Failed to generate access token');
    }

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '3',
      secret: process.env.JWT_SECRET,
    });

    if (!refreshToken) {
      throw new Error('Failed to generate refresh token');
    }

    return { accesToken, refreshToken };
  }
}
