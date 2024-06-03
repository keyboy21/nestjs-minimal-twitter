import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { CreatePostDto, createPostSchema } from './dto/create.dto';
import { EditPostDto, editPostSchema } from './dto/edit.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreatePostEntity, EditPostEntity, PostEntity } from './entities';
import { DeletePostDto, deletePostSchema } from './dto/delete.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: HttpStatus.OK, type: [PostEntity] })
  public async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Get one post' })
  @ApiResponse({ status: HttpStatus.OK, type: PostEntity })
  public async getOnePost(@Param('postId') postId: string) {
    return await this.postService.getOnePost(+postId);
  }

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiBody({
    type: CreatePostEntity,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreatePostEntity })
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @UseGuards(AuthGuard)
  public async createPost(@Body() body: CreatePostDto) {
    return await this.postService.createPost(body);
  }

  @Patch(':postId')
  @ApiOperation({ summary: 'Edit post' })
  @ApiBody({ type: EditPostEntity })
  @ApiResponse({ status: HttpStatus.OK, type: EditPostEntity })
  @UsePipes(new ZodValidationPipe(editPostSchema))
  @UseGuards(AuthGuard)
  public async editPost(@Param('postId') postId: string) {
    console.log('postId', postId);
    // if (!postId) throw new NotFoundException('Post not found');
    // return await this.postService.editPost(body, +postId);
  }

  @Delete(':postId')
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(deletePostSchema))
  @UseGuards(AuthGuard)
  public async deletePost(@Param('postId') postId: string, body: DeletePostDto) {
    return await this.postService.deletePost(+postId, body.authorId);
  }
}
