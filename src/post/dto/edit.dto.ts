import z from 'zod';

export const editPostSchema = z.object({
  post: z.string(),
  authorId: z.number(),
}).required();

export type EditPostDto = z.infer<typeof editPostSchema>;
