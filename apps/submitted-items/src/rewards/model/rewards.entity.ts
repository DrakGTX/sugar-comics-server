import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SubmittedItem } from '../../items/model/items.entitiy';

@Entity()
export class SubmittedReward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    limited: boolean;

    @Column({ nullable: true })
    limit: number;

    @Column()
    description: string;

    @Column({
        name: 'itemId'
    })
    itemId: number;

    @ManyToOne(() => SubmittedItem)
    @JoinColumn({ name: 'itemId' })
    item: SubmittedItem;
}
