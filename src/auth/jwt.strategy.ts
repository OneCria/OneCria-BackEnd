import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'PUT THIS SHIT IN THE ENV FILE'
        })
    }

    async validate(payload: any ) {
        return {
            id: payload.sub,
            name: payload.name,
        }
    }
}