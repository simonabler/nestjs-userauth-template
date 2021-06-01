import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { IUser } from '../interfaces/user.interface';
import { Role } from './role.entity';
@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  name: null | string;

  @Column({ nullable: true, default: null })
  username: null | string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (roles: Role) => roles.users, { cascade: true })
  @JoinTable()
  roles: Role[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
