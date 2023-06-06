import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    await app.startAllMicroservices();
    const PORT = configService.get('PORT') || 5003;
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
