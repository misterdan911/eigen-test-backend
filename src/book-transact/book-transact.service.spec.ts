import { Test, TestingModule } from '@nestjs/testing';
import { BookTransactService } from './book-transact.service';

describe('BookTransactService', () => {
  let service: BookTransactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookTransactService],
    }).compile();

    service = module.get<BookTransactService>(BookTransactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
