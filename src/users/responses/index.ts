import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/users/responses/register';

export class UserResponse {
  @ApiProperty({
    example: 'username',
    description: 'The unique username of the user',
  })
  userName: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  description?: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
  surname: string;

  @ApiProperty({ description: 'User address' })
  address: Address;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The profile image URL of the user',
  })
  image?: string;

  @ApiProperty({
    example: '2000-01-01T00:00:00Z',
    description: 'The birth date of the user',
  })
  birthDate: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date and time when the user was created',
  })
  createdAt: Date;
}
