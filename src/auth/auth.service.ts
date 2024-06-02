import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { registerUserDto } from './dto/register.dto';
import { AuthTokenPayload } from './types';
import { loginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private pisma: PrismaService,
    private usersService: UsersService,
  ) { }

  public async register(
    payload: registerUserDto,
  ): Promise<registerUserDto | BadRequestException> {
    const emailExist = await this.usersService.findUserByEmail(payload.email);

    if (emailExist) return new BadRequestException('User with this email already exist');

    const userNameExist = await this.usersService.findUserByUserName(
      payload.userName,
    );

    if (userNameExist) return new BadRequestException('User with this userName already exist ');

    return this.usersService.createUser(payload)

  }

  public async login(payload: loginUserDto) {
      const findUserByUserName = this.usersService.findUserByUserName(payload.username)
  }

  private async generateToken(payload: AuthTokenPayload) {

    const accesToken = this.jwtService.sign(payload, {
      expiresIn: '1d'
    })

    const regreshToken = this.jwtService.sign(payload, {
      expiresIn: '3'
    })

    return { accesToken, regreshToken }

  }
}
