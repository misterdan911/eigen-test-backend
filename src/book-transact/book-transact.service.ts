import { Inject, Injectable } from '@nestjs/common';
import { LoanBookDto } from './dto/loan-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookTransact } from './book-transact.schema';
import { BookService } from 'src/book/book.service';

enum TransactType {
  LOAN = 'loan',
  RETURN = 'return'
}

@Injectable()
export class BookTransactService {

  @Inject(BookService)
  private readonly bookService: BookService;

  constructor(
    @InjectModel('BookTransact') private readonly bookTransactModel: Model<BookTransact>
  ) { }

  async createLoan(loanBookDto: LoanBookDto) {
    let transactCode = this.generateTransactionCode();
    let todayDate = new Date();

    loanBookDto.bookcopy_code.forEach( async (bookCopyCode) => {
      let transactData = {
        code: transactCode,
        member_code: loanBookDto.member_code,
        bookcopy_code: bookCopyCode,
        transact_type: TransactType.LOAN,
        transact_date: todayDate
      };

      await this.bookTransactModel.create(transactData);
      await this.bookService.setLoanToAndLoanDueDate(bookCopyCode, loanBookDto.member_code);
    });

    return {success: 'true'};
  }

  private generateTransactionCode(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // months are zero-indexed
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const milliseconds = ('00' + now.getMilliseconds()).slice(-3);

    const random = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    const transactionNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${random}`;

    return transactionNumber;
  }


}
