import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';

import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
// import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './models/user.entity';
import { Roles } from './models/models-constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // TODO: RETURN THE INSERT RESULT INSTEAD OF THE USER TO CATCH ERRORS
  public createUser(createUserData: CreateUserInput): Omit<User, 'password'> {
    const user: User = {
      id: uuidv4(),
      isSubscribed: true,
      role: Roles.USER,
      ...createUserData,
    };

    this.usersRepository.insert(user);
    return user;
  }

  public async updateUser(
    updateUserData: UpdateUserInput,
  ): Promise<Omit<User, 'password'> | undefined> {
    const user: Omit<User, 'password'> | undefined =
      await this.usersRepository.findOne({
        where: { id: updateUserData.id },
      });
    return this.usersRepository.save({
      ...user,
      ...updateUserData,
    });
  }

  // SHOULD THIS BE PRIVATE?
  getUser(getUserArgs: GetUserArgs): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { name: getUserArgs.name },
    });
  }

  // SHOULD THIS BE PRIVATE?
  findById(id: string): Promise<Omit<User, 'password'>> {
    const user = this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }
    return user;
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public deleteUser(deleteUserData: DeleteUserInput): Promise<DeleteResult> {
    return this.usersRepository.delete(deleteUserData.id);
  }
}
