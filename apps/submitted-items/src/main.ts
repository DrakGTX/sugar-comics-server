import { NestFactory } from '@nestjs/core';
import { SubmittedItemsModule } from './submitted-items.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(SubmittedItemsModule);
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 5002;
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
