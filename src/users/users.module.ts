import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UsersController } from './users.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UploadService],
  exports: [UsersService],
})
export class UsersModule { }
