import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [UsersModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule { }
