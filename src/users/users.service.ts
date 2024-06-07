import { Injectable } from '@nestjs/common';
import { registerUserDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from '@node-rs/argon2';
import { AuthTokenPayload } from 'src/auth/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async createUser(payload: registerUserDto) {
    // TODO: DO some stuff with image

    const hashPassword = await this.hashPassword(payload.password);

    const user = await this.prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        surname: payload.surname,
        userName: payload.userName,
        birthDate: payload.birthDate,
        password: hashPassword,
        address: {
          create: {
            city: payload.address.city,
            country: payload.address.country,
          },
        },
      },
    });

    return user;
  }

  public async getUserInfo(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        surname: true,
        userName: true,
        birthDate: true,
        address: true,
        image: true,
        description: true,
      },
    });
  }

  public async validateUser(payload: AuthTokenPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        userName: payload.userName,
      },
    });

    if (user === null) return null;

    return payload;
  }

  public async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async findUserByUserName(userName: string) {
    return await this.prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });
  }

  private async hashPassword(password: string) {
    const hashedPassword = await hash(password);

    return hashedPassword;
  }
}
