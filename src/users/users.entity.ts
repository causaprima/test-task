import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: "users"})
export class User {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({example: 'Alex', description: 'Имя пользователя'})
    @Column({nullable: true})
    name: string;

    @ApiProperty({example: 'user@gmail.com', description: 'Почтовый адрес'})
    @Column({unique: true, nullable: false})
    email: string;

    @ApiProperty({example: '12345', description: 'Пароль'})
    @Column({nullable: false})
    password: string;

    @ApiProperty({example: '2021-09-13T14:53:21.717Z', description: 'Дата создания пользователя'})
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({example: null, description: 'Дата удаления пользователя'})
    @DeleteDateColumn({default: null})
    deletedAt?: Date;
}
