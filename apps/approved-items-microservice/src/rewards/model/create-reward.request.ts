import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateRewardRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    limited: boolean;

    @IsNumber()
    @IsPositive()
    @IsInt()
    limit: number | null;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    itemId: number;
}
