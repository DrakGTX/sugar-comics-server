import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
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
    create(@Body() item: CreateItemRequest, @Req() req: any) {
        console.log(req.user);
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

    @Post('/approve-submitted/:id')
    @UseGuards(JwtAuthGuard)
    approveItemById(@Param('id') id: number, @Req() req: any) {
        return this.itemsService.approveItemById(id, req.cookies?.Authentication);
    }
}
