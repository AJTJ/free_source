import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User_No_Password } from 'src/users/models/user-no-password';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<User_No_Password> {
    const user = await this.authService.validateUser(username, password);
    console.log({ user });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
