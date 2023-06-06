import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.Authentication;
                }
            ]),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate({ userEmail }: TokenPayload) {
        try {
            return await this.usersService.getUserByEmail(userEmail);
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}
