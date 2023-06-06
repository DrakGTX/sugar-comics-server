import { NestFactory } from '@nestjs/core';
import { ApprovedItemsMicroserviceModule } from './approved-items-microservice.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common';

async function bootstrap() {
    const app = await NestFactory.create(ApprovedItemsMicroserviceModule);
    const rmqService = app.get<RmqService>(RmqService);
    app.connectMicroservice(rmqService.getOptions('APPROVING'));
    app.useGlobalPipes(new ValidationPipe());
    await app.startAllMicroservices();
}
bootstrap();
