import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsUUID } from 'class-validator';
@InputType()
export class PasswordLoginInput {
  @Field(() => String)
  @IsEmail()
  email: string;
  @Field(() => String)
  @IsUUID()
  password: string;
}
