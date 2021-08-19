import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { User } from './models/user';
import { UsersService } from './users.service';
import { DeleteResult } from 'typeorm';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User | undefined> {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<DeleteResult> {
    return this.usersService.deleteUser(deleteUserData);
  }
}
