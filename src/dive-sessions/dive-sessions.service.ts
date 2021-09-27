import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateDiveSessionInput } from './dto/input/create-dive-session.input';
import { DiveSession } from './models/dive-session';

@Injectable()
export class DiveSessionsService {
  constructor(
    @InjectRepository(DiveSession)
    private readonly diveSessionsRepository: Repository<DiveSession>,
  ) {}

  createDiveSession(
    createDiveSessionInput: CreateDiveSessionInput,
    user: User,
  ): DiveSession {
    const diveSession: DiveSession = {
      id: v4(),
      startTime: null,
      endTime: null,
      dives: null,
      user,
      name: null,
      ...createDiveSessionInput,
    };
    this.diveSessionsRepository.insert(diveSession);
    return diveSession;
  }

  getDiveSessions(user: User) {
    this.diveSessionsRepository.find({
      where: { email: user.email },
    });
  }
}
