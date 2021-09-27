import { Test, TestingModule } from '@nestjs/testing';
import { DiveSessionsResolver } from './dive-sessions.resolver';

describe('DiveSessionsResolver', () => {
  let resolver: DiveSessionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiveSessionsResolver],
    }).compile();

    resolver = module.get<DiveSessionsResolver>(DiveSessionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
