import { ApiProperty } from '@nestjs/swagger';
import z from 'zod';

export const addLikeSchema = z
  .object({
    postId: z.number(),
    userId: z.number(),
  })
  .required();

export type AddLikePostDto = z.infer<typeof addLikeSchema>;

export class AddLikePostBody {
  @ApiProperty({
    description: 'post id',
    example: 1,
    type: Number,
    required: true,
  })
  postId: number;

  @ApiProperty({
    description: 'user id',
    example: 1,
    type: Number,
    required: true,
  })
  userId: number;
}
