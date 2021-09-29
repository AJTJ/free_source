import { Field, ObjectType /* Int */ } from '@nestjs/graphql';
import { DiveSession } from 'src/dive-sessions/models/dive-session';
import { Roles } from './models-constants';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  isSubscribed: boolean;

  @Field(() => Roles, { defaultValue: Roles.USER })
  role: string;

  @Field(() => [String])
  diveSessions: string[];
}
