// ENTITIY IS USED FOR TYPEORM PURPOSES

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './models-constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('bool', { nullable: true })
  isSubscribed: boolean;

  @Column('text', { default: Roles.USER, nullable: false })
  role: string;
}
