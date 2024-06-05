import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create.dto';
import { EditPostDto } from './dto/edit.dto';
import { AddLikePostDto } from './dto/addLike.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

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

    if (!postExists) throw new NotFoundException('Post not found');

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
          },
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

    if (!postExists) throw new NotFoundException('Post not found');

    const isPostOwner = postExists.authorId === payload.authorId;

    if (!isPostOwner)
      throw new BadRequestException('You are not allowed to edit this post');

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

    if (!postExists) throw new NotFoundException('Post not found');

    const isPostOwner = postExists.authorId === authorId;

    if (!isPostOwner)
      throw new BadRequestException('You are not allowed to delete this post');

    const deleteLike = this.prisma.like.deleteMany({
      where: {
        postId,
      },
    });

    const deleteBookmark = this.prisma.bookmark.deleteMany({
      where: {
        postId,
      },
    });

    const deletePost = this.prisma.post.delete({
      where: {
        id: postId,
      },
    });

    const transaction = await this.prisma.$transaction([
      deleteLike,
      deleteBookmark,
      deletePost,
    ]);

    if (!transaction) throw new BadRequestException('Something went wrong');

    return { postId, authorId };
  }

  public async addLike({ postId, userId }: AddLikePostDto) {
    const postExists = await this.prisma.post.count({
      where: {
        id: postId,
      },
    });

    if (postExists > 0) throw new NotFoundException('Post not found');

    const userAlreadyLiked = await this.prisma.like.count({
      where: {
        postId,
        userId,
      },
    });

    if (userAlreadyLiked > 0)
      throw new BadRequestException('You already liked this post');

    return await this.prisma.like.create({
      data: {
        postId,
        userId,
      },
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
