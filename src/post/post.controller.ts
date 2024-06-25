import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { AddToBookmarkDto, addToBookmarkSchema } from './dto/addBookmark.dto';
import {
  AddLikePostBody,
  AddLikePostDto,
  addLikeSchema,
} from './dto/addLike.dto';
import { CreatePostDto, createPostSchema } from './dto/create.dto';
import { DeletePostDto, deletePostSchema } from './dto/delete.dto';
import { EditPostDto, editPostSchema } from './dto/edit.dto';
import { PostService } from './post.service';
import { CreatePostEntity, EditPostEntity, PostEntity } from './responses';

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
  public async getOnePost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getOnePost(postId);
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
  public async editPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: EditPostDto,
  ) {
    return await this.postService.editPost(body, postId);
  }

  @Delete(':postId')
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(deletePostSchema))
  @UseGuards(AuthGuard)
  public async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: DeletePostDto,
  ) {
    return await this.postService.deletePost(postId, body.authorId);
  }

  @Post('/add-like')
  @ApiBody({ type: AddLikePostBody })
  @ApiOperation({ summary: 'Add like' })
  @ApiResponse({ status: HttpStatus.OK, type: AddLikePostBody })
  @UsePipes(new ZodValidationPipe(addLikeSchema))
  @UseGuards(AuthGuard)
  public async addLike(@Body() body: AddLikePostDto) {
    return await this.postService.addLike(body);
  }

  @Post('/remove-like')
  @ApiOperation({ summary: 'Remove like' })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(addLikeSchema))
  @UseGuards(AuthGuard)
  public async removeLike(@Body() body: AddLikePostDto) {
    return await this.postService.removeLike(body);
  }

  @Post('/add-to-bookmarks')
  @ApiOperation({ summary: 'Add to bookmarks' })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(addToBookmarkSchema))
  @UseGuards(AuthGuard)
  public async addToBookmark(@Body() body: AddToBookmarkDto) {
    return await this.postService.addToBookmark(body);
  }

  @Post('/remove-from-bookmarks')
  @ApiOperation({ summary: 'Remove from bookmarks' })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(addToBookmarkSchema))
  @UseGuards(AuthGuard)
  public async removeBookmark(@Body() body: AddToBookmarkDto) {
    return await this.postService.removeBookmark(body);
  }
}
