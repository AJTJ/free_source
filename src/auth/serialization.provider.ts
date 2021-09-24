import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error, user: { id: string; email: string }) => void,
  ) {
    console.log('serializing');
    done(null, { id: user.id, email: user.email });
  }

  async deserializeUser(
    payload: { id: string; role: string },
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.usersService.findById(payload.id);
    console.log('deserializing');
    done(null, user);
  }
}
