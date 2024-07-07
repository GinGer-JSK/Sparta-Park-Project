import { SupportMessage } from 'src/support-message/entities/support-message.entity';
import { UserInfos } from '../../user-ifnos/entities/user-infos.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  nickname: string;

  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER, nullable: false })
  role: Role;

  @Column({ type: 'int', default: 1000000, nullable: false })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
