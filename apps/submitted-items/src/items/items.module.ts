import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmittedItem } from './model/items.entitiy';
import { RewardsModule } from '../rewards/rewards.module';
import { RmqModule, AuthModule } from '@app/common';
import { APPROVING_SERVICE } from '../constants/services';

@Module({
    providers: [ItemsService],
    controllers: [ItemsController],
    imports: [
        TypeOrmModule.forFeature([SubmittedItem]),
        RewardsModule,
        RmqModule.register({
            name: APPROVING_SERVICE
        }),
        AuthModule
    ]
})
export class ItemsModule {}
