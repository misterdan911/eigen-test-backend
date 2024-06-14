import { Test, TestingModule } from '@nestjs/testing';
import { BookTransactController } from './book-transact.controller';
import { BookTransactService } from './book-transact.service';

describe('BookTransactController', () => {
  let controller: BookTransactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookTransactController],
      providers: [BookTransactService],
    }).compile();

    controller = module.get<BookTransactController>(BookTransactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
