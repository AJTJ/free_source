import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsUUID } from 'class-validator';
// import { SearchTypes } from './args-constants';

@ArgsType()
export class GetUserByEmailArgs {
  @Field()
  @IsEmail()
  email: string;
}

@ArgsType()
export class GetUserByIdArgs {
  @Field()
  @IsUUID()
  id: string;
}
