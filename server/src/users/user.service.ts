import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const busyUsername = await this.findOne(createUserDto.username);
        if (busyUsername) throw new ConflictException();

        const {username, password} = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new this.userModel({
            username: username,
            password: hashedPassword,
            role: 'user',
        });
        return user.save();
    }

    async deleteAll(): Promise<string> {
        await this.userModel.deleteMany();
        return 'all users deleted from database';
    }

    async deleteOne(id: mongoose.ObjectId): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        return deletedUser;
    }

    async getAll(): Promise<User[]> {
        const allUsers = await this.userModel.find();
        return allUsers;
    }

    async findOne(username: string): Promise<User | undefined> {
        const serverUser = await this.userModel.findOne({username: username});
        return serverUser;
    }
}
