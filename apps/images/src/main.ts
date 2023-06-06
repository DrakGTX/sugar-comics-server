import { NestFactory } from '@nestjs/core';
import { ImagesModule } from './images.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ImagesModule);
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 5004;
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
