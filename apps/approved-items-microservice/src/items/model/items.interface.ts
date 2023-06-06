// import { IReward } from '../../rewards/model/rewards.interface';

export interface IItem {
    id: number;
    name: string;
    author: string;
    description: string;
    creationDate: Date;
    startDate: Date;
    removeDate: Date;
    estimated: number;
    accumulated: number;
    supporters: number;
    video: string;
    story: string;
    // rewards: IReward[];
}
