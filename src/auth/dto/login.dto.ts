import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

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
export class loginUserBody {
  @ApiProperty({
    example: 'johnkrasewski',
    description: 'username',
    required: true,
  })
  userName: string;

  @ApiProperty({
    example: '12345678',
    description: 'password',
    required: true,
  })
  password: string;
}
