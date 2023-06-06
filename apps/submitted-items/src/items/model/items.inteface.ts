import { IReward } from '../../rewards/model/rewards.interface';

export interface IItem {
    id: number;
    name: string;
    author: string;
    description: string;
    estimated: number;
    video?: string;
    story: string;
    rewards: IReward[];
}
