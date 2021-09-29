import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/models/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error, user: { id: string; email: string }) => void,
  ) {
    console.log('serializing');
    done(null, { id: user.id, email: user.email });
  }

  async deserializeUser(
    payload: { id: string; role: string },
    done: (err: Error, user: Omit<UserEntity, 'password'>) => void,
  ) {
    const user = await this.usersService.getUserById({ id: payload.id });
    console.log('deserializing');
    done(null, user);
  }
}
