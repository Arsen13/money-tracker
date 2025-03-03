import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.prisma.user.findUnique({
            where: {
                email: createUserDto.email
            }
        });
        if (existUser) throw new BadRequestException(`User with email: ${createUserDto.email} already exist`);
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: hashedPassword,
            }
        });

        const token = this.jwtService.sign({email: createUserDto.email });

        return {
            id: user.id,
            email: user.email,
            token
        }
    }

    async findOne(email: string) {
        return this.prisma.user.findUnique({ where: { email } })
    }
}
