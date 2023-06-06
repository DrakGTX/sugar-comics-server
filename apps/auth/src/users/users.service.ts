import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './model/create-user.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async createUser(data: CreateUserRequest) {
        await this.validateCreateUserRequest(data);
        const user = await this.usersRepository.save({
            email: data.email,
            password: await bcrypt.hash(data.password, 10)
        });
        return user;
    }

    private async validateCreateUserRequest(data: CreateUserRequest) {
        let user: User;
        try {
            user = await this.usersRepository.findOne({
                where: {
                    email: data.email
                }
            });
        } catch (err) {}

        if (user) {
            throw new UnprocessableEntityException('Email already in use.');
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            }
        });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        return user;
    }

    async getUserByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email: email
            }
        });
    }
}
