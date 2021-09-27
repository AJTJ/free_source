import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { Query } from 'type-graphql';
import { DiveSessionsService } from './dive-sessions.service';
import { CreateDiveSessionInput } from './dto/input/create-dive-session.input';
import { DiveSession } from './models/dive-session';

@Resolver(() => DiveSession)
export class DiveSessionsResolver {
  constructor(
    private readonly diveSessionsService: DiveSessionsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => DiveSession)
  async getDiveSessions() {
    const user = await this.usersService.getUser({
      email: 'joe@joe.com',
    });
    return this.diveSessionsService.getDiveSessions(user);
  }

  // this should definitely be a mutation
  @Query(() => DiveSession)
  async createSession(
    @Args('createDiveSessionData')
    createDiveSessionInput: CreateDiveSessionInput,
  ): Promise<DiveSession> {
    const user = await this.usersService.getUser({
      email: 'joe@joe.com',
    });
    return this.diveSessionsService.createDiveSession(
      createDiveSessionInput,
      user,
    );
  }
}

// '87e217e1-68af-4f67-800f-f65d5373b273'
