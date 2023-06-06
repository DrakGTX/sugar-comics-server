import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { ApprovedReward } from './model/rewards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [RewardsService],
    imports: [TypeOrmModule.forFeature([ApprovedReward])],
    exports: [RewardsService]
})
export class RewardsModule {}
