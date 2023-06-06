import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { RewardsModule } from './rewards/rewards.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule } from '@app/common';
import { RmqModule } from '@app/common';
import { APPROVING_SERVICE } from './constants/services';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
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
            envFilePath: './apps/submitted-items/.env'
        }),
        RmqModule.register({
            name: APPROVING_SERVICE
        }),
        DatabaseModule,
        ItemsModule,
        RewardsModule,
        AuthModule
    ]
})
export class SubmittedItemsModule {}
