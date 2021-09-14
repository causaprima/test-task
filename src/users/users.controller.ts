import {Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import { UserValidationPipe } from 'src/pipes/user-validation.pipe';

@Controller('users')
export class UsersController {
    constructor(private usersServices: UsersService) {}

    @UsePipes(UserValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersServices.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersServices.getAllUsers();
    }

    @Get('/filter')
    getByName(@Query('name') userName: string) {
        return this.usersServices.getUsersByName(userName);
    }

    @Get(':id')
    getOneById(@Param('id') userId: number) {
        return this.usersServices.getUserById(userId);
    }

    @UsePipes(UserValidationPipe)
    @Put()
    update(@Body() updateDto: UpdateUserDto) {
        return this.usersServices.updateUser(updateDto);
    }

    @Delete(':id')
    softDelete(@Param() userId: number) {
        return this.usersServices.softDeleteUser(userId)
    }

}
