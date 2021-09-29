import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@ObjectType()
export class Cookie {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  email: string;
}
