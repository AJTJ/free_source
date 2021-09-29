// ENTITIY IS USED FOR TYPEORM PURPOSES

import { DiveSessionEntity } from 'src/dive-sessions/models/dive-session.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class DiveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { nullable: true })
  depth: number;

  @Column('interval', { nullable: true })
  diveTime: string;

  @Column({ length: 500, nullable: true })
  name: string;

  @ManyToOne(() => DiveSessionEntity, (diveSession) => diveSession.dives)
  diveSessionEntity: DiveSessionEntity;
}
