import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose from 'mongoose';
import { Public } from "../decorators/public";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Public()
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Public()
    @Delete()
    deleteAll() {
        return this.userService.deleteAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.userService.findOne(username);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: mongoose.ObjectId) {
        return this.userService.deleteOne(id);
    }
}
