import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(username: string, password: string): Promise<any> {
        const user: any = await this.usersService.findOneByUser(username)
        console.log('TESTE', user[0].password)
        if (user && user[0].password === password) {
            
            const { password, username, ...rest } = user
            return rest
        }

        return null;
        // user.then((user) => console.log('USER', user))
    } 

    async login(user: any) {
        console.log('USERRR', user[0])
        const payload = { name: user[0].name, sub: user[0].id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
