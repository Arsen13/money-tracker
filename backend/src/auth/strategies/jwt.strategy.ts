import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUser } from "src/types/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                return req.cookies?.token || null;
            }]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || '',
          });
    }

    async validate(user: IUser) {
        return { 
            id: user.id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }
}