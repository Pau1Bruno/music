import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../decorators/public';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @UseGuards(LocalAuthGuard) // returns an object with only one property: "access_token"
    @Post('/login')
    async login(@Request() req) {
        console.log(req.user);
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard) // returns an object with two properties: "username" and "role"
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
