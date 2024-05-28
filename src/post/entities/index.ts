import { ApiProperty } from "@nestjs/swagger";

export class CreatePostEntity {
    @ApiProperty({ description: 'The content of the post' })
    post: string;

    @ApiProperty({ description: 'The ID of the author' })
    authorId: number;
}


export class EditPostEntity {
    @ApiProperty({ description: 'The content of the post' })
    post: string;

    @ApiProperty({ description: 'The ID of the author' })
    authorId: number;
}

export class PostEntity {
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