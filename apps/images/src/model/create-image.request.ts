import { IsNotEmpty } from 'class-validator';

export class CreateImageRequest {
    @IsNotEmpty()
    // @IsNumber()
    itemId: number;
}
