import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SubmittedItem } from './model/items.entitiy';
import { CreateItemRequest } from './model/create-item.request';
import { RewardsService } from '../rewards/rewards.service';
import { lastValueFrom } from 'rxjs';
import { APPROVING_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(SubmittedItem) private readonly itemsRepository: Repository<SubmittedItem>,
        private rewardsService: RewardsService,
        @Inject(APPROVING_SERVICE) private readonly approvingClient: ClientProxy,
        private itemsDataSource: DataSource
    ) {}
    private readonly logger = new Logger(ItemsService.name);

    async getAll(): Promise<SubmittedItem[]> {
        return this.itemsRepository.find({ relations: ['rewards'] });
    }

    async create(item: CreateItemRequest) {
        const queryRunner = this.itemsDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
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
        } finally {
            await queryRunner.release();
        }
    }

    async getItemById(id: number): Promise<SubmittedItem | null> {
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

        this.logger.log(`Deleting item with id:${id}...`);
        await this.itemsRepository.delete(id);
    }

    async approveItemById(id: number, authentication: string) {
        const queryRunner = this.itemsDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const item = await this.itemsRepository.findOne({
                where: {
                    id: id
                },
                relations: ['rewards']
            });

            if (item) {
                this.logger.log('Approving item...');

                const emitData = {
                    name: item.name,
                    author: item.author,
                    description: item.description,
                    estimated: item.estimated,
                    video: item.video,
                    story: item.story,
                    rewards: item.rewards
                };

                const approvingResponse = await lastValueFrom(
                    this.approvingClient.emit('item_approved', { emitData, Authentication: authentication })
                );

                await this.removeItemById(id);

                await queryRunner.commitTransaction();
                return approvingResponse;
            } else {
                this.logger.log('Approving item transaction failed.');
                await queryRunner.rollbackTransaction();
            }
        } catch (error) {
            this.logger.log('Approving item transaction failed.');
            await queryRunner.rollbackTransaction();
        } finally {
            this.logger.log('Approving item transaction released.');
            await queryRunner.release();
        }
    }
}
