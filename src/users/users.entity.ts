import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: false})
    isDeleted: boolean

    @Column()
    createdAt: Date;

    @Column({default: null})
    deletedAt: Date;
}
