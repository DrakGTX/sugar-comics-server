import { NestFactory } from '@nestjs/core';
import { ApprovedItemsModule } from './approved-items.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ApprovedItemsModule);
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 5001;
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
