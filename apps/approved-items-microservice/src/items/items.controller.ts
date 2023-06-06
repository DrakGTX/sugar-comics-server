import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RmqService } from '@app/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { ItemsService } from './items.service';
import { CreateItemRequest } from './model/create-item.request';

@Controller('approve-item')
export class ItemsController {
    constructor(private itemsService: ItemsService, private readonly rmqService: RmqService) {}

    @EventPattern('item_approved')
    @UseGuards(JwtAuthGuard)
    async handleItemApproved(
        @Payload() data: { emitData: CreateItemRequest; Authentication: string },
        @Ctx() context: RmqContext
    ) {
        const creationResult = await this.itemsService.create(data.emitData);
        this.rmqService.ack(context);
        return creationResult;
    }
}
