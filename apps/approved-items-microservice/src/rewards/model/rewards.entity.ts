import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApprovedItem } from '../../items/model/items.entity';

@Entity()
export class ApprovedReward {
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

    @Column({ default: 0 })
    claimed: number;

    @Column()
    description: string;

    @Column({
        name: 'itemId'
    })
    itemId: number;

    @ManyToOne(() => ApprovedItem)
    @JoinColumn({ name: 'itemId' })
    item: ApprovedItem;
}
