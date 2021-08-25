import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class PasswordLoginInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  @IsUUID()
  password: string;
}
