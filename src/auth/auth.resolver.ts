import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/user';
import { AuthService } from './auth.service';
import { PasswordLoginInput } from './dto/input/password-login.input';
import { UseGuards, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { JwtReturn } from './models/jwt-return';
import { AUTH_CONSTANTS } from './auth-constants';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => JwtReturn)
  async login(
    @Args('passwordLoginInput') passwordLoginInput: PasswordLoginInput,
    @Context() { res },
  ) {
    const val = await this.authService.login(passwordLoginInput);
    res.cookie(AUTH_CONSTANTS.FREE_AUTH, val.access_token);
    return val;
  }
}
