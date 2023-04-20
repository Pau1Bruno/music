import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) {}
    
    async signIn(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!user || !passwordMatches) {
            throw new UnauthorizedException();
        }
        
        const payload = { username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}