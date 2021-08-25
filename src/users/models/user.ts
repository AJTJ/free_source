import { Field, ObjectType /* Int */ } from '@nestjs/graphql';

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
}
@ObjectType()
export class User_No_Password {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  isSubscribed: boolean;
}
