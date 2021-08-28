import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/user';
import { AuthService } from './auth.service';
import { PasswordLoginInput } from './dto/input/password-login.input';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { JwtReturn } from './models/jwt-return';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => JwtReturn)
  login(@Args('passwordLoginInput') passwordLoginInput: PasswordLoginInput) {
    console.log(passwordLoginInput);
    console.log(this.authService.login(passwordLoginInput));
    return this.authService.login(passwordLoginInput);
  }
}