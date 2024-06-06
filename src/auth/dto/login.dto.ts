import { extendApi, generateSchema, extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const loginSchema = z
  .object({
    userName: z
      .string()
      .min(4, { message: 'username must be at least 3 characters long' }).openapi({
        example: 'username',
        description: 'The username of the user',
    
      }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .openapi({
        example: 'Password123asdasd!',
        description: 'The password of the user',
      }),
  })
  .required()

export type loginUserDto = z.infer<typeof loginSchema>;
export const myOpenApiSchema = generateSchema(loginSchema);