import {Injectable, UnauthorizedException} from '@nestjs/common';
import {compare} from "bcrypt"
import {LoginResponseDto} from "./dto/login-response.dto";
import {UserService} from "../user/user.service";
import {UserMetadata} from "../user/dto/user-metadata";

@Injectable()
export class AuthService {

    private readonly tokenPrefix = 'token_';

    constructor(private usersService: UserService) {
    }

    async validateToken(token: string): Promise<UserMetadata> {
        return token.startsWith(this.tokenPrefix) ?
            await this.usersService.findMetadataOrFail(token.slice(this.tokenPrefix.length))
            : Promise.reject(new Error("Invalid token"));
    }

    generateToken(email: string): string {
        return `${this.tokenPrefix}${email}`;
    }

    async signIn(email: string, password: string): Promise<LoginResponseDto> {
        const user = await this.usersService.findOne(email);
        if (user === null || !user.isEnabled || !await compare(password, user.password).catch(() => false)) {
            throw new UnauthorizedException();
        }
        return {token: this.generateToken(user.email)};
    }
}
