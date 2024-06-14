import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { BookCopySchema } from './schemas/book-copy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'BookCopy', schema: BookCopySchema }
    ])
  ],
  exports:[BookService],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
