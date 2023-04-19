import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async create(dto: CreateUserDto): Promise<User> {
        console.log(dto);
        const createdUser = new this.userModel({ ...dto, role: "user" });
        console.log(createdUser);
        return createdUser.save();
    }
    
    async deleteAll(): Promise<string> {
        await this.userModel.deleteMany();
        return "all users deleted from database";
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
        const serverUser = await this.userModel.findOne({ username: username }).exec();
        console.log(serverUser);
        return serverUser;
    }
}
