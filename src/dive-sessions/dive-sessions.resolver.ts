import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Cookie } from 'src/auth/models/cookie';
import { Cookies } from 'src/decorators/cookie.decorator';
// import { SearchTypes } from 'src/users/dto/args/args-constants';
import { UsersService } from 'src/users/users.service';
import { Query } from 'type-graphql';
import { DiveSessionsService } from './dive-sessions.service';
import { CreateDiveSessionInput } from './dto/input/create-dive-session.input';
import { DiveSession } from './models/dive-session';
import { DiveSessionEntity } from './models/dive-session.entity';

@Resolver(() => DiveSessionEntity)
export class DiveSessionsResolver {
  constructor(
    private readonly diveSessionsService: DiveSessionsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => DiveSessionEntity)
  async getDiveSessions() {
    const userId = '87e217e1-68af-4f67-800f-f65d5373b273';
    return this.diveSessionsService.getDiveSessions(userId);
  }

  @Mutation(() => DiveSession)
  async createSession(
    @Args('createDiveSessionData')
    createDiveSessionInput: CreateDiveSessionInput,
    @Cookies('connect.sid') cookie: Cookie,
  ): Promise<DiveSession> {
    // const userId =
    const userId = '87e217e1-68af-4f67-800f-f65d5373b273';
    const sessionEntity = await this.diveSessionsService.createDiveSession(
      createDiveSessionInput,
      userId,
    );
    const session: DiveSession = {
      ...sessionEntity,
      dives: sessionEntity.dives.map((x) => x.id),
      user: sessionEntity.user.id,
    };
    return session;
  }
}

// '87e217e1-68af-4f67-800f-f65d5373b273'
