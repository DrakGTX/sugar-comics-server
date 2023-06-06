import { Module } from '@nestjs/common';
import { FilesService } from './files.serivce';

@Module({
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule {}
