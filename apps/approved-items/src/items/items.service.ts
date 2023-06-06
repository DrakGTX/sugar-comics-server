import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApprovedItem } from './model/items.entity';
import { CreateItemRequest } from './model/create-item.request';
import { Repository, LessThan, DataSource } from 'typeorm';
import { RewardsService } from '../rewards/rewards.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ApprovedItem) private readonly itemsRepository: Repository<ApprovedItem>,
        private rewardsService: RewardsService,
        private itemsDataSource: DataSource
    ) {}
    private readonly logger = new Logger(ItemsService.name);

    async getAll(): Promise<ApprovedItem[]> {
        return this.itemsRepository.find({ relations: ['rewards'] });
    }

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

    async getItemById(id: number): Promise<ApprovedItem | null> {
        return this.itemsRepository.findOne({
            where: {
                id: id
            },
            relations: ['rewards']
        });
    }

    async removeItemById(id: number): Promise<void> {
        this.logger.log('Deleting related rewards...');
        await this.rewardsService.removeRewardsByItemId(id);

        this.logger.log(`Deleting product with id:${id}...`);
        await this.itemsRepository.delete(id);
    }

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async removeExpiredItems(): Promise<void> {
        this.logger.log('Deleting expired items...');

        const itemsToRemove = await this.itemsRepository.find({
            where: { removeDate: LessThan(new Date('2023-12-01')) },
            select: ['id']
        });

        if (itemsToRemove.length > 0) {
            for (let i = 0; i < itemsToRemove.length; i++) {
                const itemIdToRemove = itemsToRemove[i].id;
                await this.removeItemById(itemIdToRemove);
            }
        }
    }
}
