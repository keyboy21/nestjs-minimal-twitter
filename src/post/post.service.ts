import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create.dto';
import { EditPostDto } from './dto/edit.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  public async getAllPosts() {
    return await this.prisma.post.findMany({
      include: {
        _count: {
          select: {
            bookmarks: true,
            likes: true,
          },
        },
      },
    });
  }

  public async createPost(payload: CreatePostDto) {
    await this.prisma.post.create({
      data: {
        post: payload.post,
        authorId: payload.authorId,
      },
    });

    return payload;
  }

  public async getOnePost(postId: number) {
    const postExists = await this.postExists(postId);

    if (!postExists) return new NotFoundException('Post not found');

    const post = this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        _count: {
          select: {
            bookmarks: true,
            likes: true,
          },
        },
        authorId: true,
        author: {
          select: {
            userName: true,
          }
        },
        post: true,
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return post;
  }

  public async editPost(payload: EditPostDto, postId: number) {
    const postExists = await this.postExists(postId);

    if (!postExists) return new NotFoundException('Post not found');

    const isPostOwner = postExists.authorId === payload.authorId;

    if (!isPostOwner) return new BadRequestException('You are not allowed to edit this post');

    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        post: payload.post,
      },
    });

    return payload;
  }

  public async deletePost(postId: number, authorId: number) {
    const postExists = await this.postExists(postId);

    if (!postExists) return new NotFoundException('Post not found');

    const isPostOwner = postExists.authorId === authorId;

    if (!isPostOwner) return new BadRequestException('You are not allowed to delete this post');

    return await this.prisma.post.delete({
      where: {
        id: postId,
      },
      include: {
        bookmarks: true,
        likes: true,
      }
    });
  }

  private async postExists(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    return post;
  }
}
