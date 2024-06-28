import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { hash } from '@node-rs/argon2';
import { AuthTokenPayload } from 'src/auth/types';
import { editUserDto, editUserPrivateSettingsDto } from './dto/editUser.dto';
import { registerUserDto } from 'src/auth/dto/register.dto';
import { UploadService, UploadType } from 'src/upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: UploadService,
  ) { }

  public async createUser(payload: registerUserDto) {
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

  public async editUser({ id, payload }: { id: number; payload: editUserDto }) {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: payload.name,
        surname: payload.surname,
        birthDate: payload.birthDate,
        address: {
          update: {
            zip: payload.address.zip,
            city: payload.address.city,
            country: payload.address.country,
          },
        },
      },
    });

    return payload;
  }

  public async editUserPrivateSettings({ id, payload }: { id: number, payload: editUserPrivateSettingsDto }) {
    const userExists = await this.prisma.user.findUnique({ where: { id: id } });
    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const userNameAlreadyExists = await this.prisma.user.findUnique({ where: { userName: payload.userName } });
    if (userNameAlreadyExists) {
      throw new BadRequestException('Username already exists');
    }

    const emailAlreadyExists = await this.prisma.user.findUnique({ where: { email: payload.email } });
    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashPassword = await this.hashPassword(payload.password);

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        userName: payload.userName,
        email: payload.email,
        password: hashPassword,
      },
    });
  }

  public async getUser(id: number) {
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
        avatar: true,
        background: true,
        bio: true,
      },
    });
  }

  public async uploadAvatar(userId: number, avatar: Express.Multer.File) {
    const avatarPath = this.fileService.createFile(UploadType.IMAGE, avatar);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: avatarPath,
      },
    });
  }

  public async uploadBackgroundImage(
    userId: number,
    background: Express.Multer.File,
  ) {
    const backgroundImagePath = this.fileService.createFile(
      UploadType.IMAGE,
      background[0],
    );
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        background: backgroundImagePath,
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

  public async findUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  private async hashPassword(password: string) {
    const hashedPassword = await hash(password);

    return hashedPassword;
  }
}
