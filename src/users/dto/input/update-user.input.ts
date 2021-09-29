import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsEmail()
  email: string;
}

// @Field()
//   @IsOptional()
//   @IsNotEmpty()
//   age?: number;

// @Field()
//   @IsNotEmpty()
//   @IsUUID()
//   id: string;

//   @Field({ nullable: true })
//   @IsOptional()
//   isSubscribed?: boolean;
