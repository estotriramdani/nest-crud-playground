import { Test, TestingModule } from '@nestjs/testing';
import { CowsController } from './cows.controller';
import { CowsService } from './cows.service';

describe('CowsController', () => {
  let controller: CowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CowsController],
      providers: [CowsService],
    }).compile();

    controller = module.get<CowsController>(CowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
