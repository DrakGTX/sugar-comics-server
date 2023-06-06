import { Module } from '@nestjs/common';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { RewardsModule } from './rewards/rewards.module';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_NAME: Joi.string().required(),
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                AUTOLOAD_ENTITIES: Joi.number().required(),
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_APPROVING_QUEUE: Joi.string().required(),
                RABBIT_MQ_AUTH_QUEUE: Joi.string().required()
            }),
            envFilePath: './apps/approved-items-microservice/.env'
        }),
        DatabaseModule,
        RmqModule,
        AuthModule,
        ItemsModule,
        RewardsModule
    ]
})
export class ApprovedItemsMicroserviceModule {}
