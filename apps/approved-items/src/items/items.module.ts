import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovedItem } from './model/items.entity';
import { RewardsModule } from '../rewards/rewards.module';
import { AuthModule, RmqModule } from '@app/common';

@Module({
    providers: [ItemsService],
    controllers: [ItemsController],
    imports: [TypeOrmModule.forFeature([ApprovedItem]), RewardsModule, RmqModule, AuthModule]
})
export class ItemsModule {}
