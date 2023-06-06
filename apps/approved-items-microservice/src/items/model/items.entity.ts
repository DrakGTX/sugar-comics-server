import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApprovedReward } from '../../rewards/model/rewards.entity';

const getStartDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 14);
    return currentDate;
};

const getEndDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 44);
    return currentDate;
};

const getRemoveDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 58);
    return currentDate;
};

@Entity()
export class ApprovedItem {
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

    @Column({ type: 'timestamptz', default: getStartDate() })
    startDate: Date;

    @Column({ type: 'timestamptz', default: getEndDate() })
    endDate: Date;

    @Column({ type: 'timestamptz', default: getRemoveDate() })
    removeDate: Date;

    @Column()
    estimated: number;

    @Column({ default: 0 })
    accumulated: number;

    @Column({ default: 0 })
    supporters: number;

    @Column({ nullable: true })
    video: string;

    @Column()
    story: string;

    @OneToMany(() => ApprovedReward, (rewards) => rewards.item)
    public rewards: ApprovedReward[];
}
