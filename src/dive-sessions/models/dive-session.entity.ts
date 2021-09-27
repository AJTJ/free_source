// ENTITIY IS USED FOR TYPEORM PURPOSES

import { Dive } from 'src/dives/models/dive.entity';
import { User } from 'src/users/models/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DiveSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp', { nullable: true })
  startTime: number;

  @Column('timestamp', { nullable: true })
  endTime: number;

  @Column({ length: 500, nullable: true })
  name: string;

  @OneToMany(() => Dive, (dive) => dive.diveSession)
  dives: Dive[];

  @ManyToOne(() => User, (user) => user.diveSessions)
  user: User;
}
