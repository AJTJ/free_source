import { Field, ObjectType /* Int */ } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ObjectType()
export class UserId {
  @Field()
  @IsUUID()
  id: string;
}
