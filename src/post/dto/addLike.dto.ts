import z from 'zod';

export const addLikeSchema = z
  .object({
    postId: z.number(),
    userId: z.number(),
  })
  .required();

export type AddLikePostDto = z.infer<typeof addLikeSchema>;
