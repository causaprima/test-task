import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(dto);
        return this.usersRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find({where: {deletedAt: null}});
    }

    async getUserById(userId: number): Promise<User> {
        await this.doesIdExists(userId);
        return await this.usersRepository.findOne(userId, {where: {deletedAt: null}});;
    }

    async getUsersByName(userName: string): Promise<User[]> {
        return await this.usersRepository.find({name: userName});
    }

    async updateUser(userId: number, dto: UpdateUserDto) {
        await this.doesIdExists(userId);
        return await this.usersRepository.update(userId, dto);
    }

    async softDeleteUser(userId: number) {
        await this.doesIdExists(userId);
        return await this.usersRepository.softDelete(userId);
    }

    async doesIdExists(userId: number) {
            const user = await this.usersRepository.findOne(userId);
            if (!user) {
                throw new HttpException(`Пользователь с таким ID не найден`, HttpStatus.BAD_REQUEST);
            }
    }
}
