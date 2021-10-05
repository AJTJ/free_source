import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/models/user.entity';
// import { PasswordLoginInput } from './dto/input/password-login.input';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    // console.log('validate pass info', { passwordLoginInput });
    const user = await this.authService.validateUser({ email, password });
    // console.log('user in local.strat validate', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
