import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/model/user.entity';

export interface TokenPayload {
    userEmail: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

    async login(user: User, response: Response) {
        const tokenPayload = {
            userEmail: user.email
        };

        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires
        });
    }

    logout(response: Response) {
        response.cookie('Authentication', '', {
            httpOnly: true,
            expires: new Date()
        });
    }
}
