import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';

import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      id: uuidv4(),
      isSubscribed: true,
      ...createUserData,
    };

    this.usersRepository.insert(user);
    return user;
  }

  public async updateUser(
    updateUserData: UpdateUserInput,
  ): Promise<User | undefined> {
    const user: User | undefined = await this.usersRepository.findOne({
      where: { id: updateUserData.id },
    });
    return this.usersRepository.save({
      ...user,
      ...updateUserData,
    });
  }

  public getUser(getUserArgs: GetUserArgs): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id: getUserArgs.id },
    });
    // return this.usrs.find((user) => user.id === getUserArgs.id);
  }

  public getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public deleteUser(deleteUserData: DeleteUserInput): Promise<DeleteResult> {
    // const userIndex = this.usrs.findIndex(
    //   (user) => user.id === deleteUserData.id,
    // );

    // const user = this.usrs[userIndex];

    // this.usrs.splice(userIndex);

    return this.usersRepository.delete(deleteUserData.id);
    // return user;
  }
}

// private usrs: User[] = [
//   {
//     id: 'ef306759-7a1e-43ce-bfc0-f6cb1583ae3b',
//     name: 'Tim',
//     email: 'dog@dog.com',
//     isSubscribed: true,
//   },
// ];
