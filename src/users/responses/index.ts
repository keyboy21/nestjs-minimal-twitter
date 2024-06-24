import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/auth/responses/register';

export class UserResponse {
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
