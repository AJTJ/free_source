import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserByIdArgs } from './dto/args/get-user.args';
// import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { User } from './models/user';
import { UserEntity } from './models/user.entity';
import { UsersService } from './users.service';
import { DeleteResult } from 'typeorm';
// import { UseGuards } from '@nestjs/common';
// import { LocalAuthGuard } from 'src/auth/local-auth.guard';
// import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { Public } from 'src/decorators/public.decorator';
import { Cookies } from 'src/decorators/cookie.decorator';
import { UserId } from './models/user-id';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserByIdArgs): Promise<User> {
    const userEntity = await this.usersService.getUserById(getUserArgs);
    const user: User = {
      ...userEntity,
      diveSessions: userEntity.diveSessions.map((x) => x.id),
    };
    return user;
  }

  // TESTING A PUBLIC ROUTE
  @Public()
  @Query(() => [User])
  getAllUsers(@Cookies('connect.sid') cookie: string): Promise<UserEntity[]> {
    console.log('cookie in get all', cookie);
    return this.usersService.getAllUsers();
  }

  // TESTING A PROTECTED ROUTE COMPARED TO THE ONE ABOVE
  @Query(() => [User])
  getAllUsersProtected(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<Omit<User, 'password'>> {
    const newUser = await this.usersService.createUser(createUserData);
    console.log({ newUser });
    const user: User = { ...newUser, diveSessions: [] };
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<Omit<User, 'password'>> {
    const userEntity: UserEntity = await this.usersService.updateUser(
      updateUserData,
    );
    const user: User = {
      ...userEntity,
      diveSessions: userEntity.diveSessions.map((x) => x.id),
    };
    return user;
  }

  @Mutation(() => User)
  deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<DeleteResult> {
    return this.usersService.deleteUser(deleteUserData);
  }
}
