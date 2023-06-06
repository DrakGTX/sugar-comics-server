import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardRequest } from './model/create-reward.request';

@Controller('rewards')
export class RewardsController {
    constructor(private rewardsService: RewardsService) {}

    @Post('/create')
    create(@Body() reward: CreateRewardRequest) {
        return this.rewardsService.create(reward);
    }

    @Delete('/:id')
    removeRewardById(@Param('id') id: number) {
        return this.rewardsService.removeRewardById(id);
    }

    @Delete('/item/:id')
    removeRewardsByItemId(@Param('id') itemId: number) {
        return this.rewardsService.removeRewardsByItemId(itemId);
    }
}
