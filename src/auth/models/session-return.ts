import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class SessionReturn {
  @Field(() => String)
  id: string;
}
