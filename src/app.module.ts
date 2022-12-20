import {Module} from "@nestjs/common";
import {TrackModule} from "./track/app.module";
import {MongooseModule} from "@nestjs/mongoose";


@Module({
    imports: [
        TrackModule,
        // MongooseModule.forRoot('mongodb://localhost/5000'),
    ]
})
export class AppModule {
}