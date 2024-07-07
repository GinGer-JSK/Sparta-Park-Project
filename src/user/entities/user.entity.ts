import { SupportMessage } from 'src/support-message/entities/support-message.entity';
import { UserInfos } from '../../user-ifnos/entities/user-infos.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  JoinColumn,
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

  @Column({ type: 'enum', enum: Role, default: Role.Customer })
  role: Role;

  @Column({ type: 'varchar', nullable: false })
  nickname: string;

  @Column({ type: 'int', nullable: false })
  point: number;

  @Column({ type: 'int', nullable: false })
  mobile: string;

  @OneToOne((type) => UserInfos, (userInfos) => userInfos.user)
  @JoinColumn()
  userInfos: UserInfos;

  @OneToMany(() => SupportMessage, (supportMessage) => supportMessage.user)
  supportMessages: SupportMessage[];
}
