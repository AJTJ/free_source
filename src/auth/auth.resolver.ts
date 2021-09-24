import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/user';
import { AuthService } from './auth.service';
import { PasswordLoginInput } from './dto/input/password-login.input';
import { Body, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
// import { JwtReturn } from './models/jwt-return';
// import { AUTH_CONSTANTS } from './auth-constants';
import { SessionReturn } from './models/session-return';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => SessionReturn)
  async login(
    @Context() { req },
    @Args('passwordLoginInput') passwordLoginInput: PasswordLoginInput,
  ) {
    console.log('in login fn body');
    return { id: req.session.passport.user.id };
  }
}

// THE OLD LOGIN USING JWTS
// @Public()
// @UseGuards(LocalAuthGuard)
// @Mutation(() => JwtReturn)
// async jwt_login(
//   @Args('passwordLoginInput') passwordLoginInput: PasswordLoginInput,
//   @Context() { res },
// ) {
//   const val = await this.authService.login(passwordLoginInput);
//   res.cookie(AUTH_CONSTANTS.FREE_AUTH, val.access_token);
//   return val;
// }
