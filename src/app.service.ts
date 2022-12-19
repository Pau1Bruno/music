import {Get, Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    @Get()
    getUsers() : string {
        return 'GET ALL USERS';
    }
}