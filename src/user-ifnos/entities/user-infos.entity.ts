import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Index('nickname', ['nickname'], { unique: true })
@Entity({
  name: 'user_infos',
})
export class UserInfos {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  nickname: string;

  @Column({ type: 'int', unique: false, nullable: false, default: 1000000 })
  point: number;

  @Column({
    name: 'mobile_number',
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  mobileNumber: string;

  @Column({ type: 'varchar', unique: false, nullable: true })
  description: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'NULL',
  })
  updatedAt: Date;

  @OneToOne((type) => User, (user) => user.userInfos, {
    nullable: false, // 설정 안할시 기본값 true
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
  @Column({ name: 'user_id', type: 'int', unique: true, nullable: false })
  userId: number;
}
