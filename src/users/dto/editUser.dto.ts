import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/auth/responses/register';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .max(50);

const usernameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]*$/, {
    message: 'Username must be alphanumeric',
  })
  .min(4, { message: 'username must be at least 4 characters long' })
  .max(50);

export const editUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'name must be at least 1 characters long' }),
    surname: z
      .string()
      .min(1, { message: 'surname must be at least 1 characters long' }),
    address: z.object({
      city: z.string().min(1),
      country: z.string().min(1),
      zip: z.string().min(1).optional(),
    }),
    birthDate: z.string().date(),
    bio: z.string().optional(),
  })
  .required();

export const editUserPrivateSettingsSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordSchema,
  userName: usernameSchema,
});

export type editUserDto = z.infer<typeof editUserSchema>;
export type editUserPrivateSettingsDto = z.infer<typeof editUserPrivateSettingsSchema>;

export class editUserBody {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
  surname: string;

  @ApiProperty({ description: 'User address' })
  address: Address;

  @ApiProperty({
    example: '2000-01-01T00:00:00Z',
    description: 'The birth date of the user',
  })
  birthDate: Date;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  bio: string;
}

export class editUserPrivateSettingsBody {
  @ApiProperty({ example: 'example@gmail.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  password: string;

  @ApiProperty({ example: 'username', description: 'The username of the user' })
  userName: string;
}

