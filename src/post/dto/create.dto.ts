import z from 'zod';

export const createPostSchema = z
  .object({
    post: z.string(),
    authorId: z.number(),
  })
  .required();

export type CreatePostDto = z.infer<typeof createPostSchema>;
