import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemRequest } from './model/create-item.request';
import { JwtAuthGuard } from '@app/common';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get('/all')
    all() {
        return this.itemsService.getAll();
    }

    @Post('/create')
    // @UseGuards(JwtAuthGuard)
    create(@Body() item: CreateItemRequest) {
        return this.itemsService.create(item);
    }

    @Get(':id')
    getItemById(@Param('id') id: number) {
        return this.itemsService.getItemById(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    removeItemById(@Param('id') id: number) {
        return this.itemsService.removeItemById(id);
    }
}
