export interface IReward {
    id: number;
    name: string;
    price: number;
    limited: boolean;
    limit: number | null;
    claimed: number;
    description: string;
    itemId: number;
}
