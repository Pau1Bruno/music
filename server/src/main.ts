import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const cors = require('cors'); // разрешение на отправление запросов с localhost:3000 на localhost:5000
const corsOptions ={
    origin: "*",
    credentials:true,
    optionSuccessStatus:200
}

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        app.use(cors(corsOptions));

        await app.listen(PORT, '192.168.0.106', () => {
            console.log(`server starts on PORT ${ PORT }`);
        });
    } catch ( e ) {
        console.error(e);
    }
};

start();