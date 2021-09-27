import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/models/user';
import { PasswordLoginInput } from './dto/input/password-login.input';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    passwordLoginInput: PasswordLoginInput,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authService.validateUser(passwordLoginInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
