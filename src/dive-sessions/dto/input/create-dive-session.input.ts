import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateDiveSessionInput {
  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field({ nullable: true })
  name: string;
}

// import { Field, InputType } from '@nestjs/graphql';
// import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// @InputType()
// export class CreateUserInput {
//   @Field()
//   @IsNotEmpty()
//   name: string;

//   @Field()
//   @MinLength(10)
//   password: string;

//   @Field()
//   @IsEmail()
//   email: string;
// }
