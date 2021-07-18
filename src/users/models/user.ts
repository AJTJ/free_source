import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  isSubscribed: boolean;
}
