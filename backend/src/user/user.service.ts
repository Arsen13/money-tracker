import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: createUserDto.email
            }
        });
        console.log("here")
        if (user) throw new BadRequestException(`User with email: ${createUserDto.email} already exist`);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        return this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
            }
        })
    }


}
