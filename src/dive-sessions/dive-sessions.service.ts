import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchTypes } from 'src/users/dto/args/args-constants';
// import { UserEntity } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateDiveSessionInput } from './dto/input/create-dive-session.input';
import { DiveSessionEntity } from './models/dive-session.entity';

@Injectable()
export class DiveSessionsService {
  constructor(
    @InjectRepository(DiveSessionEntity)
    private readonly diveSessionsRepository: Repository<DiveSessionEntity>,
    private usersService: UsersService,
  ) {}

  async createDiveSession(
    createDiveSessionInput: CreateDiveSessionInput,
    userId: string,
  ): Promise<DiveSessionEntity> {
    let newSession = new DiveSessionEntity();
    newSession.id = v4();
    newSession.user = await this.usersService.getUserById({
      id: userId,
    });
    newSession = { ...newSession, ...createDiveSessionInput };

    this.diveSessionsRepository.insert(newSession);
    return newSession;
  }

  // THIS NEEDS TO BE A JOIN OF SOME TYPE
  getDiveSessions(userId: string) {
    this.diveSessionsRepository.find({
      where: { user: userId },
    });
  }

  archiveDiveSession() {
    console.log('archive the dive session and all of its dives');
  }

  unarchiveDiveSession() {
    console.log('unarchive dive session and all of its dives');
  }

  deleteDiveSession() {
    console.log('permanently delete the session and all of is dives');
  }
}
