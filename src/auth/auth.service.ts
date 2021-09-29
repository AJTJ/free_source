import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/users/models/user.entity';

import { PasswordLoginInput } from './dto/input/password-login.input';
// import { JwtReturn } from './models/jwt-return';
import * as argon2 from 'argon2';
import { SearchTypes } from 'src/users/dto/args/args-constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // private jwtService: JwtService,
  ) {}

  async validateUser(
    passwordLoginInput: PasswordLoginInput,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user: UserEntity = await this.usersService.getUserByEmail({
      email: passwordLoginInput.email,
    });
    if (!!user?.password) {
      try {
        if (await argon2.verify(user.password, passwordLoginInput.password)) {
          return user;
        } else {
          return null;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // async login(passwordLoginInput: PasswordLoginInput): Promise<JwtReturn> {
  //   console.log('in auth.service login');
  //   return {
  //     access_token: this.jwtService.sign(passwordLoginInput),
  //   };
  // }
}
