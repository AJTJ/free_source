// ENTITIY IS USED FOR TYPEORM PURPOSES

import { DiveEntity } from 'src/dives/models/dive.entity';
import { UserEntity } from 'src/users/models/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DiveSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp', { nullable: true })
  startTime: string;

  @Column('timestamp', { nullable: true })
  endTime: string;

  @Column({ length: 500, nullable: true })
  name: string;

  @OneToMany(() => DiveEntity, (dive) => dive.diveSessionEntity)
  dives: DiveEntity[];

  @ManyToOne(() => UserEntity, (user) => user.diveSessions)
  user: UserEntity;
}
