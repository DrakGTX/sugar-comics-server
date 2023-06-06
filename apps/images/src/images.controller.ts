import { Body, Controller, Post, UploadedFile, UseInterceptors, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageRequest } from './model/create-image.request';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Get('/get-by-item-id/:itemId')
    getImageByItemId(@Param('itemId') itemId: number) {
        return this.imagesService.getImageByItemId(itemId);
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    createImage(@Body() data: CreateImageRequest, @UploadedFile() image) {
        return this.imagesService.create(data, image);
    }
}
