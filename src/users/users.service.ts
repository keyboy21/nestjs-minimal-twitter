import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from 'src/shared/entity/User.entity';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    public async createUser(user: UserEntity): Promise<UserEntity> {
        return user
    }

    public async findUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
    public async findUserByUserName(userName: string) {
        return await this.prisma.user.findUnique({
            where: {
                userName: userName
            }
        })
    }

}
