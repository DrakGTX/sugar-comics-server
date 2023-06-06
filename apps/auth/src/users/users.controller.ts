import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './model/create-user.request';
import { UsersService } from './users.service';

@Controller('auth/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('create')
    async createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request);
    }
}
