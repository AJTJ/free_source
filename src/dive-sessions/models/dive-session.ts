import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Dive } from 'src/dives/models/dive';
import { User } from 'src/users/models/user';
import { Field } from 'type-graphql';

@ObjectType()
export class DiveSession {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Dive])
  dives: Dive[];

  @Field(() => User)
  user: User;
}
