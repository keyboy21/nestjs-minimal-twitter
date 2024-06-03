import z from 'zod';

export const deletePostSchema = z.object({ authorId: z.number() }).required();

export type DeletePostDto = z.infer<typeof deletePostSchema>;
