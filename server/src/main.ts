import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";



const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //чтобы отпралять запросы с localhost:3000 на localhost:5000
    optionSuccessStatus:200
}



const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        app.use(cors(corsOptions))
        await app.listen(PORT, () => {
            console.log(`server starts on PORT ${ PORT }`);
        });

    } catch ( e ) {
        console.log(e);
    }
};

start();