import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRewardRequest } from './model/create-reward.request';
import { ApprovedReward } from './model/rewards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardsService {
    constructor(@InjectRepository(ApprovedReward) private readonly rewardsRepository: Repository<ApprovedReward>) {}
    private readonly logger = new Logger(RewardsService.name);

    async create(reward: CreateRewardRequest) {
        return this.rewardsRepository.save(reward);
    }
}
