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
        return await this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne(id);
        if (!user) throw new HttpException(`Пользователь с таким ID не найден`, HttpStatus.BAD_REQUEST);
        return user;
    }

    async getUsersByName(name: string): Promise<User[]> {
        return await this.usersRepository.find({name: name});
    }

    async updateUser(dto: UpdateUserDto) {
        const {id, ...rest} = dto;

        const [user] = await this.usersRepository.findByIds([id]);
        if (!user) throw new HttpException(`Пользователь с таким ID не найден`, HttpStatus.BAD_REQUEST);

        try {
            return await this.usersRepository.update(id, rest);
        } catch (e) {
            throw new HttpException(`Попытка обновить несуществующее поле`, HttpStatus.BAD_REQUEST);
        }
    }

    async softDeleteUser(id: number) {
        const user = await this.usersRepository.findOne(id);
        if (!user) throw new HttpException(`Пользователь с таким ID не найден`, HttpStatus.BAD_REQUEST);
        return await this.usersRepository.softDelete(id);
    }
}
