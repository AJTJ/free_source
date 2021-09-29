import { ObjectType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { Dive } from 'src/dives/models/dive';
import { User } from 'src/users/models/user';

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

  @Field(() => [String])
  dives: string[];

  @Field(() => String)
  @IsUUID()
  user: string;
}
