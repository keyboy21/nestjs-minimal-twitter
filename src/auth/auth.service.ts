import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { hash } from '@node-rs/argon2'

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private pisma: PrismaService,
        private usersService: UsersService) { }

    async register(payload: RegisterUserDto): Promise<RegisterUserDto | BadRequestException> {

        const emailExist = await this.usersService.findUserByEmail(payload.email)

        if (emailExist) {
            return new BadRequestException('User with this email already exist')
        }

        const userNameExist = await this.usersService.findUserByUserName(payload.userName)

        if (userNameExist) {
            return new BadRequestException('User with this userName already exist ')
        }

        const hashPassword = await this.hashPassword(payload.password)

        const user = await this.pisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                surname: payload.surname,
                userName: payload.userName,
                birthDate: payload.birthDate,
                password: hashPassword,
                // image: payload.image,
                address: {
                    create: {
                        city: payload.address.city,
                        country: payload.address.country
                    }
                }
            },
        })

        return {
            ...user,
            address: {
                city: payload.address.city,
                country: payload.address.country
            }
        }

    }

    private async hashPassword(password: string) {
        const hashedPassword = await hash(password)

        return hashedPassword;
    }
}
