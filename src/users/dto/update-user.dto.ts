import {IsDefined, IsEmail, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class UpdateUserDto {
    @IsDefined()
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly id: number;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
}