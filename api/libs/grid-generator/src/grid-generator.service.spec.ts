import { Test, TestingModule } from '@nestjs/testing';
import { GridGeneratorService } from './grid-generator.service';

describe('GridGeneratorService', () => {
  let service: GridGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GridGeneratorService],
    }).compile();

    service = module.get<GridGeneratorService>(GridGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
