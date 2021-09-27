import { ObjectType } from '@nestjs/graphql';
import { DiveSession } from 'src/dive-sessions/models/dive-session';
import { Field } from 'type-graphql';

type DiveSessionType = DiveSession;

@ObjectType()
export class Dive {
  @Field()
  id: string;

  // in meters, but should be flexible to feet
  @Field({ nullable: true })
  depth: number;

  @Field({ nullable: true })
  diveTime: number;

  @Field({ nullable: true })
  name: string;

  @Field(() => DiveSession)
  diveSession: DiveSession;
}

// What would be the best practice for getting the user info on a gql mutation request?
// I'm using sessions and the `userId` is stored in the client cookie. I was thinking that I would check the cookie for the `userId` and then query the db to get the user object.
