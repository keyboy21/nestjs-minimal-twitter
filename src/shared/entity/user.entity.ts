import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
    id: number;

    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 'username', description: 'The unique username of the user' })
    userName: string;

    @ApiProperty({ example: 'password', description: 'The password of the user' })
    password: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    name: string;

    @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
    surname: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The profile image URL of the user' })
    image?: string;

    @ApiProperty({ example: 1, description: 'The unique identifier of the address' })
    addressId: number;

    @ApiProperty({ example: '2000-01-01T00:00:00Z', description: 'The birth date of the user' })
    birthDate: Date;

    @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'The date and time when the user was created' })
    createdAt: Date;
}