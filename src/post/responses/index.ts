import { ApiProperty } from '@nestjs/swagger';

export class CreatePostResponse {
  @ApiProperty({ description: 'The content of the post' })
  post: string;

  @ApiProperty({ description: 'The ID of the author' })
  authorId: number;
}

export class EditPostResponse {
  @ApiProperty({ description: 'The content of the post' })
  post: string;

  @ApiProperty({ description: 'The ID of the author' })
  authorId: number;
}

export class PostResponse {
  @ApiProperty({ description: 'Post id' })
  id: number;

  @ApiProperty({ description: 'The content of the post' })
  post: string;

  @ApiProperty({ description: 'The ID of the author' })
  authorId: number;

  @ApiProperty({ description: 'The name of the author' })
  authorName: string;

  @ApiProperty({ description: 'Likes count' })
  likesCount: number;

  @ApiProperty({ description: 'Bookmarks count' })
  bookmarksCount: number;

  @ApiProperty({ description: 'Created date' })
  createdAt: string;
  @ApiProperty({ description: 'Edited date' })
  editedDate: string;
}
