import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

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
}
