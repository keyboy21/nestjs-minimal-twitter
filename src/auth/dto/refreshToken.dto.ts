import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const refreshTokenSchema = z
  .object({ refreshToken: z.string() })
  .required();
export type refreshTokenDto = z.infer<typeof refreshTokenSchema>;

export class refreshTokenBody {
  @ApiProperty({
    example: 'gkl4jg5lk4j54i5gj5p',
    description: 'refresh token',
    type: String,
    required: true,
  })
  refreshToken: string;
}
