import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as process from "process";
import * as path from "path";
import { config } from "dotenv";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";

config();
const DB_URL = process.env.DB_URL;

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "static") }),
        TrackModule,
        FileModule,
        MongooseModule.forRoot(DB_URL),
        AuthModule,
        UserModule
    ]
})

export class AppModule {
}