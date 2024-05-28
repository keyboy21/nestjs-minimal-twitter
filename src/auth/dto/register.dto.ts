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
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  .max(50);

const usernameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]*$/, {
    message: 'Username must be alphanumeric',
  })
  .min(4, { message: 'username must be at least 4 characters long' })
  .max(50);

export const registersSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: passwordSchema,
  userName: usernameSchema,
  name: z
    .string()
    .min(1, { message: 'name must be at least 1 characters long' }),
  surname: z
    .string()
    .min(1, { message: 'surname must be at least 1 characters long' }),
  image: z.string().optional().nullable(),
  address: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    zip: z.string().min(1).optional(),
  }),
  birthDate: z.string().date(),
});

export type RegisterUserDto = z.infer<typeof registersSchema>;
