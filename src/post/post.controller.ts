import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
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

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: HttpStatus.OK, type: [PostEntity] })
  public async getAllPosts() {
    console.log('asdasd');
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Get one post' })
  @ApiResponse({ status: HttpStatus.OK, type: PostEntity })
  public async getOnePost(@Param('postId') postId: number) {
    console.log('asdasd');
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create post' })
  @ApiBody({
    type: CreatePostEntity,
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreatePostEntity })
  @UsePipes(new ZodValidationPipe(createPostSchema))
  public async createPost(@Body() body: CreatePostDto) {
    return body;
  }

  @Patch(':postId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit post' })
  @ApiBody({
    type: EditPostEntity,
  })
  @UsePipes(new ZodValidationPipe(editPostSchema))
  @ApiResponse({ status: HttpStatus.OK, type: EditPostEntity })
  public async editPost(
    @Param('postId') postId: number,
    @Body() body: EditPostDto,
  ) {
    console.log('postId>>>>', postId);
    return {
      body,
      postId,
    };
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: HttpStatus.OK })
  public async deletePost(@Param('postId') postId: number) {
    return postId;
  }
}
