import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import { UserValidationPipe } from 'src/pipes/user-validation.pipe';

@Controller('users')
export class UsersController {
    constructor(private usersServices: UsersService) {}

    @UsePipes(UserValidationPipe)
    @Post('/create')
    create(@Body() userDto: CreateUserDto) {
        return this.usersServices.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersServices.getAllUsers();
    }

    @Get(':id')
    getOneById(@Param('id') userId: number) {
        return this.usersServices.getUserById(userId);
    }

    @Get('name/:name')
    getByName(@Param('name') userName: string) {
        return this.usersServices.getUsersByName(userName);
    }

    @UsePipes(UserValidationPipe)
    @Put(':id/update')
    update(@Param() userId: number, @Body() updateDto: UpdateUserDto) {
        return this.usersServices.updateUser(userId, updateDto);
    }

    @Delete(':id/delete')
    softDelete(@Param() userId: number) {
        return this.usersServices.softDeleteUser(userId)
    }

}
