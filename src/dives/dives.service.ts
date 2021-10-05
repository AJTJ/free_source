import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiveSessionEntity } from 'src/dive-sessions/models/dive-session.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateDiveInput } from './dto/input/create-dive.input';
import { GetDiveInput } from './dto/input/get-dive.input';
import { DiveEntity } from './models/dive.entity';

@Injectable()
export class DivesService {
  constructor(
    @InjectRepository(DiveEntity)
    private readonly divesRepository: Repository<DiveEntity>,
  ) {}

  createDive(
    createDiveInput: CreateDiveInput,
    diveSessionEntity: DiveSessionEntity,
  ): DiveEntity {
    const dive: DiveEntity = {
      id: v4(),
      discipline: null,
      depth: null,
      name: null,
      diveTime: null,
      diveSessionEntity,
      ...createDiveInput,
    };

    this.divesRepository.insert(dive);
    return dive;
  }

  getDive(getDiveInput: GetDiveInput): Promise<DiveEntity> {
    return this.divesRepository.findOne(getDiveInput.id);
  }
}
