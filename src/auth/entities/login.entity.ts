import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
  @ApiProperty({
    description: 'username',
    example: 'username',
  })
  userName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;
}
