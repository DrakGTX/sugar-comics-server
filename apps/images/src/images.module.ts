import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './model/images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, FilesModule } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forFeature([Image]),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.string().required(),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                AUTOLOAD_ENTITIES: Joi.number().required()
            }),
            envFilePath: './apps/images/.env'
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../..', 'static'),
            serveRoot: '/images/'
        }),
        DatabaseModule,
        FilesModule
    ],
    controllers: [ImagesController],
    providers: [ImagesService]
})
export class ImagesModule {}
