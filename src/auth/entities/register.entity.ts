import { ApiProperty } from '@nestjs/swagger';

class Address {
  @ApiProperty({ example: 'New York', description: 'The city of the user' })
  city: string;

  @ApiProperty({ example: 'USA', description: 'The country of the user' })
  country: string;

  @ApiProperty({
    example: '12345',
    description: 'The zip code of the user',
    required: false,
  })
  zip?: string;
}

export class RegisterEntity {
  @ApiProperty({
    example: 'example@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({ example: 'John', description: 'username' })
  userName: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
  surname: string;

  @ApiProperty({ description: 'User image' })
  image?: string;

  @ApiProperty({ description: 'User address' })
  address: Address;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The birth date of the user',
  })
  birthDate: string;
}
