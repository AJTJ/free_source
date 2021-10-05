import { Field, ObjectType /* Int */ } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { DiveSession } from 'src/dive-sessions/models/dive-session';
import { Roles } from './user-models.constants';

@ObjectType()
export class User {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  isSubscribed: boolean;

  @Field({ defaultValue: Roles.USER })
  role: string;

  @Field(() => [String])
  diveSessions: string[];
}
