import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [
        TrackModule,
        MongooseModule.forRoot("mongodb+srv://PaulBruno:RX9YdiG4ousZwBec@cluster0.jte7kjz.mongodb.net/?retryWrites=true&w=majority")
    ]
})
export class AppModule {
}