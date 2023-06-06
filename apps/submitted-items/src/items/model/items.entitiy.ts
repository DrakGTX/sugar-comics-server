import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubmittedReward } from '../../rewards/model/rewards.entity';

@Entity()
export class SubmittedItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @Column()
    estimated: number;

    @Column({ nullable: true })
    video: string;

    @Column()
    story: string;

    @OneToMany(() => SubmittedReward, (rewards) => rewards.item)
    public rewards: SubmittedReward[];
}
