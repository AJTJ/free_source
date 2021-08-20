import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';

import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
// import { GetUsersArgs } from './dto/args/get-users.args';
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
      where: { name: getUserArgs.name },
    });
  }

  public getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public deleteUser(deleteUserData: DeleteUserInput): Promise<DeleteResult> {
    return this.usersRepository.delete(deleteUserData.id);
  }
}
