import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, User_No_Password } from 'src/users/models/user';

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PasswordLoginInput } from './dto/input/password-login.input';

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
    console.log({ username, pass });
    const user: User = await this.usersService.getUser({ name: username });
    // use encryption
    if (user && user.password === pass) {
      const { password, ...result } = user;
      const user_returned: User_No_Password = { ...result };
      console.log('user in validate auth.service', user_returned);
      return user_returned;
    }

    return null;
  }

  async login(passwordLoginInput: PasswordLoginInput) {
    console.log('in login');
    console.log(this.jwtService.sign(passwordLoginInput));
    return {
      access_token: this.jwtService.sign(passwordLoginInput),
      name: 'phil',
    };
  }
}
