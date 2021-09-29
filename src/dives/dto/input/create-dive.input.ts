import { Field, InputType } from '@nestjs/graphql';
import { DiveSession } from 'src/dive-sessions/models/dive-session';

@InputType()
export class CreateDiveInput {
  @Field()
  name: string;

  @Field()
  depth: number;

  @Field()
  diveTime: string;

  @Field(() => DiveSession)
  diveSession: DiveSession;
}
