import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ApprovedItem } from './model/items.entity';
import { CreateItemRequest } from './model/create-item.request';
import { RewardsService } from '../rewards/rewards.service';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ApprovedItem) private readonly itemsRepository: Repository<ApprovedItem>,
        private rewardsService: RewardsService,
        private itemsDataSource: DataSource
    ) {}
    private readonly logger = new Logger(ItemsService.name);

    async create(item: CreateItemRequest) {
        const queryRunner = this.itemsDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            this.logger.log('Creating new approved item...', item);
            const itemData = await this.itemsRepository.save(item);

            if (item.rewards && item.rewards.length > 0) {
                for (let i = 0; i < item.rewards.length; i++) {
                    const reward = item.rewards[i];
                    reward.itemId = itemData.id;
                    await this.rewardsService.create(reward);
                }
            }

            await queryRunner.commitTransaction();
            return itemData;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.log('Creating new approved item failed.');
        } finally {
            this.logger.log('Creating new approved item transaction released.');
            await queryRunner.release();
        }
    }
}
