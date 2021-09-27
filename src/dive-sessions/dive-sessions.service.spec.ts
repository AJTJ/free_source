import { Test, TestingModule } from '@nestjs/testing';
import { DiveSessionsService } from './dive-sessions.service';

describe('DiveSessionsService', () => {
  let service: DiveSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiveSessionsService],
    }).compile();

    service = module.get<DiveSessionsService>(DiveSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
