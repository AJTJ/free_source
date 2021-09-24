import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/models/user';

import { PasswordLoginInput } from './dto/input/password-login.input';
import { JwtReturn } from './models/jwt-return';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    inputPass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User = await this.usersService.getUser({ name: username });
    console.log('in auth.service validate user');
    if (!!user?.password) {
      try {
        if (await argon2.verify(user.password, inputPass)) {
          return user;
        } else {
          return null;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async login(passwordLoginInput: PasswordLoginInput): Promise<JwtReturn> {
    console.log('in auth.service login');
    return {
      access_token: this.jwtService.sign(passwordLoginInput),
    };
  }
}
