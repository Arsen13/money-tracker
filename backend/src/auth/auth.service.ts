import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "src/types/types";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user) throw new BadRequestException(`User with email ${email} not found`);

        const passwordIsMatch = await bcrypt.compare(password, user.password);
        if (!passwordIsMatch) throw new BadRequestException("Password is incorrect");

        const { password: userPassword, ...result } = user;
        
        return result;
    }

    async login(user: IUser) {
        const { id, email } = user;        
        return {
            id,
            email,
            token: this.jwtService.sign({ id: user.id, email: user.email })
        }
    }
}