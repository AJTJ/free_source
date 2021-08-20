import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
  // OneToMany,
} from 'typeorm';

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
}
