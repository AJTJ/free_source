import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/models/user';
import { User_No_Password } from 'src/users/models/user-no-password';

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PasswordLoginInput } from './dto/input/password-login.input';
import { JwtReturn } from './models/jwt-return';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<User_No_Password | null> {
    const user: User = await this.usersService.getUser({ name: username });
    // use encryption
    if (user && user.password === pass) {
      const { password, ...result } = user;
      const user_returned: User_No_Password = { ...result };
      return user_returned;
    }

    return null;
  }

  async login(passwordLoginInput: PasswordLoginInput): Promise<JwtReturn> {
    return {
      access_token: this.jwtService.sign(passwordLoginInput),
    };
  }
}
