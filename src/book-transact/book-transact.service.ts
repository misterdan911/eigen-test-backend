import { Inject, Injectable } from '@nestjs/common';
import { LoanBookDto } from './dto/loan-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookTransact } from './book-transact.schema';
import { BookService } from 'src/book/book.service';
import { ReturnBookDto } from './dto/return-book.dto';
import { MemberService } from 'src/member/member.service';

enum TransactType {
  LOAN = 'loan',
  RETURN = 'return'
}

@Injectable()
export class BookTransactService {

  @Inject(BookService)
  private readonly bookService: BookService;

  @Inject(MemberService)
  private readonly memberService: MemberService;

  constructor(
    @InjectModel('BookTransact') private readonly bookTransactModel: Model<BookTransact>
  ) { }

  async createLoan(loanBookDto: LoanBookDto) {
    let transactCode = this.generateTransactionCode();
    let todayDate = new Date();

    loanBookDto.bookcopy_code.forEach(async (bookCopyCode) => {
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

    return { success: 'true' };
  }

  async returnLoan(returnBookDto: ReturnBookDto) {
    let transactCode = this.generateTransactionCode();
    let todayDate = new Date();

    for (let i = 0; returnBookDto.bookcopy_code.length > i; i++) {
      let bookCopyCode = returnBookDto.bookcopy_code[i];
      let transactData = {
        code: transactCode,
        member_code: returnBookDto.member_code,
        bookcopy_code: returnBookDto.bookcopy_code[i],
        transact_type: TransactType.RETURN,
        transact_date: todayDate
      };

      await this.bookTransactModel.create(transactData);
      await this.processPenalty(bookCopyCode, todayDate);
      await this.bookService.unsetLoanToAndLoanDueDate(bookCopyCode);
    }

    return { success: 'true' };
  }

  async processPenalty(bookCopyCode: string, todayDate: Date): Promise<void> {
    let bookCopy = await this.bookService.findBookCopyByCode(bookCopyCode);
    let dueDateUtc = bookCopy.loan_due_date;
    let todayDateUtc = new Date(todayDate.toISOString());

    if (todayDateUtc > dueDateUtc) {
      const penaltyDueDate = new Date(todayDateUtc);
      penaltyDueDate.setDate(todayDateUtc.getDate() + 3);

      let updateBy = { code: bookCopy.loaned_to };
      let fieldToUpdate = { penalty_due_date: penaltyDueDate};
      await this.memberService.updateOne(updateBy, fieldToUpdate);
    }
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
