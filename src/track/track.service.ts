import { Injectable } from "@nestjs/common";


@Injectable()
export class TrackService {
    async getUsers(): Promise<string> {
        return "get all users";
    }

    async getCurrentUser(): Promise<string> {
        return "get current user";
    }
}