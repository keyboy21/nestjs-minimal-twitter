import { Injectable } from '@nestjs/common';
import { registerUserDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from '@node-rs/argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async createUser(payload: registerUserDto): Promise<registerUserDto> {
    if (payload.image) {
      // TODO: DO some stuff
    }

    const hashPassword = await this.hashPassword(payload.password);

    await this.prisma.user.create({
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
