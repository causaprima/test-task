import {IsDefined, IsEmail, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @IsDefined({message: 'Поле ID является обязательным'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly id: number;

    @ApiProperty({example: 'Alex', description: 'Имя пользователя'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 30, {message: 'Не меньше 2 и не больше 16 символов'})
    readonly name: string;

    @ApiProperty({example: 'user@gmail.com', description: 'Почтовый адрес'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Пароль'})
    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
}
