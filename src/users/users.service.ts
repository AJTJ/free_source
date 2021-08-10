import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UsersService {
  private usrs: User[] = [
    {
      id: 'ef306759-7a1e-43ce-bfc0-f6cb1583ae3b',
      name: 'Tim',
      email: 'dog@dog.com',
      isSubscribed: true,
    },
  ];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      id: uuidv4(),
      isSubscribed: true,
      ...createUserData,
    };

    this.usrs.push(user);
    console.log('USERS', this.usrs);
    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User | undefined {
    const user: User | undefined = this.usrs.find(
      (usr) => usr.id === updateUserData.id,
    );
    if (!!user) {
      Object.assign(user, updateUserData);
      return user;
    } else {
      return undefined;
    }
  }

  public getUser(getUserArgs: GetUserArgs): User | undefined {
    return this.usrs.find((user) => user.id === getUserArgs.id);
  }

  public getUsers(getUsersArgs: GetUsersArgs): (User | undefined)[] {
    return getUsersArgs.userIds.map((id) => this.getUser({ id })) || [];
  }

  public getAllUsers(): User[] {
    return this.usrs;
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.usrs.findIndex(
      (user) => user.id === deleteUserData.id,
    );

    const user = this.usrs[userIndex];

    this.usrs.splice(userIndex);

    return user;
  }
}
