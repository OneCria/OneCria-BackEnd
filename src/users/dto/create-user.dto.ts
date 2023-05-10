import { IsString } from 'class-validator';

export class CreateUserDto{
    @IsString()
    name: String;
    @IsString()
    password: String;

    constructor(
        name: string,
        password: string,
    ) {
        this.name = name;
        this.password = password;
    }
}