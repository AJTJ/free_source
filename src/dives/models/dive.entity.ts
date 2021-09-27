// ENTITIY IS USED FOR TYPEORM PURPOSES

import { DiveSession } from 'src/dive-sessions/models/dive-session.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Dive {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { nullable: true })
  depth: number;

  @Column('interval', { nullable: true })
  diveTime: number;

  @Column({ length: 500, nullable: true })
  name: string;

  @ManyToOne(() => DiveSession, (diveSession) => diveSession.dives)
  diveSession: DiveSession;
}
