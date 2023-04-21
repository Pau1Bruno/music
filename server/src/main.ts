import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";

const cors = require("cors");
const corsOptions = { // разрешение на отправление запросов с localhost:3000 на localhost:5000
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

const start = async () => {
    try {
        config();
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        
        app.use(cors(corsOptions));
        
        await app.listen(PORT, () => {
            console.log(`server starts on PORT ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();