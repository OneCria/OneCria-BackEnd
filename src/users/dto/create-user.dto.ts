import { IsString } from 'class-validator';

export class CreateUserDto{
    @IsString()
    name: String;
    @IsString()
    email: String;
    @IsString()
    password: String;

    constructor(
        name: string,
        email: string,
        password: string,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}