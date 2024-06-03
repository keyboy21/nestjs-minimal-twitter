import { z } from 'zod';

export const loginSchema = z
  .object({
    userName: z
      .string()
      .min(4, { message: 'username must be at least 3 characters long' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .required();

export type loginUserDto = z.infer<typeof loginSchema>;
