import { Module } from '@nestjs/common';
import { BookTransactService } from './book-transact.service';
import { BookTransactController } from './book-transact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookTransactSchema } from './book-transact.schema';
import { CannotLoanBorrowedBook, MemberNotPenalized, MustBeRegisteredBookCopy, MustBeRegisteredMember } from './book-transact.custom.validation';
import { MemberModule } from 'src/member/member.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BookTransact', schema: BookTransactSchema }]),
    MemberModule,
    BookModule
  ],
  controllers: [BookTransactController],
  providers: [
    BookTransactService,
    MustBeRegisteredMember,
    MemberNotPenalized,
    MustBeRegisteredBookCopy,
    CannotLoanBorrowedBook
  ],
})
export class BookTransactModule { }
