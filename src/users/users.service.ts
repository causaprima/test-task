import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    createUser(dto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(dto);
        user.createdAt = new Date();
        return this.usersRepository.save(user);
    }

    getAllUsers() {
        return this.usersRepository.find();
    }
}
