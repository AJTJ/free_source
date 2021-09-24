import { Field, ObjectType /* Int */ } from '@nestjs/graphql';
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

  @Field({ defaultValue: Roles.USER })
  role: string;
}
