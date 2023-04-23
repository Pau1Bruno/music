import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./constants";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "900s" }
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        //     {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard
        //      }
    ],
    controllers: [ AuthController ],
    exports: [ AuthService ]
})
export class AuthModule {
}