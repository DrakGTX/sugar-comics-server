import { Injectable, Logger } from '@nestjs/common';
import { ApprovedReward } from './model/rewards.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRewardRequest } from './model/create-reward.request';

@Injectable()
export class RewardsService {
    constructor(@InjectRepository(ApprovedReward) private readonly rewardsRepository: Repository<ApprovedReward>) {}
    private readonly logger = new Logger(RewardsService.name);

    async create(reward: CreateRewardRequest) {
        return this.rewardsRepository.save(reward);
    }

    async removeRewardById(id: number) {
        this.logger.log(`Deleting reward with id:${id}...`);
        return this.rewardsRepository.delete(id);
    }

    async removeRewardsByItemId(itemId: number) {
        this.logger.log(`Deleting rewards with itemId:${itemId}...`);
        return this.rewardsRepository.delete({ itemId: itemId });
    }
}
