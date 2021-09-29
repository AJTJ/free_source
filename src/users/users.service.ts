import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';

import { v4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserByEmailArgs, GetUserByIdArgs } from './dto/args/get-user.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { Roles } from './models/models-constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  // TODO: RETURN THE INSERT RESULT INSTEAD OF THE USER TO CATCH ERRORS
  createUser(createUserInput: CreateUserInput): Omit<UserEntity, 'password'> {
    let newUser = new UserEntity();
    newUser.id = v4();
    newUser.role = Roles.USER;
    newUser = { ...newUser, ...createUserInput };

    this.usersRepository.insert(newUser);
    return newUser;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    const user: UserEntity = await this.getUserById({
      id: updateUserInput.id,
    });
    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async getUserByEmail(getUserArgs: GetUserByEmailArgs): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email: getUserArgs.email },
    });
    if (!user) {
      throw new BadRequestException(
        `No user found with email ${getUserArgs.email}`,
      );
    }
    return user;
  }

  async getUserById(getUserByIdArgs: GetUserByIdArgs): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: getUserByIdArgs.id },
    });
    if (!user) {
      throw new BadRequestException(
        `No user found with id ${getUserByIdArgs.id}`,
      );
    }
    return user;
  }

  getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  deleteUser(deleteUserData: DeleteUserInput): Promise<DeleteResult> {
    return this.usersRepository.delete(deleteUserData.id);
  }
}
