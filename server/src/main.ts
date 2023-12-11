import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

const start = async () => {
    try {
        config();
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });

        await app.listen(PORT, () => {
            console.log(`server starts on PORT ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();
