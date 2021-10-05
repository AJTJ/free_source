import { ObjectType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { DiveSession } from 'src/dive-sessions/models/dive-session';

@ObjectType()
export class Dive {
  @Field()
  id: string;

  @Field()
  discipline: string;

  // in meters, but should be flexible to feet
  @Field({ nullable: true })
  depth: number;

  @Field({ nullable: true })
  diveTime: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  @IsUUID()
  diveSession: string;
}
