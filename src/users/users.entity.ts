import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn({default: null})
    deletedAt?: Date;
}
