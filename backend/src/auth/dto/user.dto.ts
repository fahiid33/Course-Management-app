import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}