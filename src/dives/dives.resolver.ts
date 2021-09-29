import { Mutation, Resolver } from '@nestjs/graphql';
import { Query } from 'type-graphql';
import { DivesService } from './dives.service';
import { Dive } from './models/dive';

@Resolver(() => Dive)
export class DivesResolver {
  constructor(private readonly divesService: DivesService) {}

  @Mutation(() => Dive)
  createDive() {
    console.log('create a dive');
  }

  @Query(() => Dive)
  getDive() {
    console.log('get a dive');
  }

  @Query(() => [Dive])
  getAllSessionDives() {
    console.log('get all dives of a single session');
  }

  @Query(() => [Dive])
  getAllDives() {
    console.log('get all dives within certain parameters');
  }

  @Mutation(() => Dive)
  archiveDive() {
    console.log('archive a single dive');
  }

  // to be avoided
  @Mutation(() => Dive)
  deleteDive() {
    console.log('delete a dive');
  }
}
