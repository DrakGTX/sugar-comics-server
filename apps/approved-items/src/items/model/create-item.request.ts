import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IReward } from '../../rewards/model/rewards.interface';

export class CreateItemRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    estimated: number;

    @IsString()
    video: string;

    @IsString()
    story: string;

    @IsArray()
    @IsNotEmpty()
    rewards: IReward[];
}
