import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { RewardsModule } from './rewards/rewards.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.string().required(),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                AUTOLOAD_ENTITIES: Joi.number().required(),
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_AUTH_QUEUE: Joi.string().required()
            }),
            envFilePath: './apps/approved-items/.env'
        }),
        DatabaseModule,
        ScheduleModule.forRoot(),
        ItemsModule,
        RewardsModule,
        RmqModule,
        AuthModule
    ]
})
export class ApprovedItemsModule {}
