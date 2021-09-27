import { Test, TestingModule } from '@nestjs/testing';
import { DivesResolver } from './dives.resolver';

describe('DivesResolver', () => {
  let resolver: DivesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivesResolver],
    }).compile();

    resolver = module.get<DivesResolver>(DivesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
