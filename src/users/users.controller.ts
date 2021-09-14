import {Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UserValidationPipe} from 'src/pipes/user-validation.pipe';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { User } from './users.entity';

@ApiTags('Users (Пользователи)')
@Controller('users')
export class UsersController {
    constructor(private usersServices: UsersService) {
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 201, type: User})
    @UsePipes(UserValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersServices.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersServices.getAllUsers();
    }

    @ApiOperation({summary: 'Получение пользователей по имени'})
    @ApiResponse({status: 200, type: [User]})
    @Get('/filter')
    getByName(@Query('name') name: string) {
        return this.usersServices.getUsersByName(name);
    }

    @ApiOperation({summary: 'Получение пользователя по ID'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    getOneById(@Param('id') userId: number) {
        return this.usersServices.getUserById(userId);
    }

    @ApiOperation({summary: 'Редактирование пользователя'})
    @ApiResponse({status: 204, description: 'Пользователь отредактирован'})
    @UsePipes(UserValidationPipe)
    @Put()
    update(@Body() updateDto: UpdateUserDto) {
        return this.usersServices.updateUser(updateDto);
    }

    @ApiOperation({summary: 'Удаление (soft-delete) пользователя'})
    @ApiResponse({status: 204, description: 'Пользователь удалён'})
    @Delete('/:id')
    softDelete(@Param() userId: number) {
        return this.usersServices.softDeleteUser(userId)
    }

}
