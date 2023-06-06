export interface IReward {
    id: number;
    name: string;
    price: number;
    limited: boolean;
    limit: number | null;
    description: string;
    itemId: number;
}
