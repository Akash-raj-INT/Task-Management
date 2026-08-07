import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../../tasks/task.entity';

export enum UserRole {
  GUEST = 'guest',
  MEMBER = 'member',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Guest' })
  displayName: string;

  @Column({ type: 'varchar', default: UserRole.GUEST })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];
}
