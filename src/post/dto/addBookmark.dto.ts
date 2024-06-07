import z from 'zod';

export const addToBookmarkSchema = z
  .object({
    postId: z.number(),
    userId: z.number(),
  })
  .required();

export type AddToBookmarkDto = z.infer<typeof addToBookmarkSchema>;
