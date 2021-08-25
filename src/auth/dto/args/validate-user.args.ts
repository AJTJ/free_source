import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class ValidateUserArgs {
  @Field(() => String)
  name: string;
  @Field(() => String)
  @IsUUID()
  id: string;
}
