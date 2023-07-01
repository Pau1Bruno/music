import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(username_check: string, password_check: string) {
        const user = await this.usersService.findOne(username_check);
        if (!user) return null;

        const passwordMatches = await bcrypt.compare(password_check, user.password);
        if (!passwordMatches) return null;

        const {username, role} = user;
        return {username, role};
    }

    async login(user: any) {
        const payload = {username: user.username, role: user.role};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
