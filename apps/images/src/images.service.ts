import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateImageRequest } from './model/create-image.request';
import { Image } from './model/images.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from '@app/common';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image) private readonly imagesRepository: Repository<Image>,
        private filesService: FilesService
    ) {}

    async create(data: CreateImageRequest, image: any) {
        //check if image with this itemId exists
        const imageGetFromDB = await this.imagesRepository.findOne({
            where: {
                itemId: data.itemId
            }
        });

        if (imageGetFromDB) {
            throw new HttpException(`Image for item with id:${data.itemId} already exists`, HttpStatus.NOT_FOUND);
        } else {
            const fileName = await this.filesService.createFile(image);
            const imageDataSave = await this.imagesRepository.save({ ...data, image: fileName });
            return imageDataSave;
        }
    }

    async getImageByItemId(itemId: number) {
        const image = await this.imagesRepository.findOne({
            where: {
                itemId: itemId
            }
        });

        if (image) {
            return image;
        } else {
            throw new HttpException(`Image with itemId:${itemId} not found`, HttpStatus.NOT_FOUND);
        }
    }
}
