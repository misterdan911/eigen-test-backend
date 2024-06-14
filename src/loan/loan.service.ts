import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from './loan.schema';
import { MemberService } from 'src/member/member.service';

@Injectable()
export class LoanService {

  @Inject(MemberService)
  private readonly memberService: MemberService;

  constructor(@InjectModel('Loan') private readonly loanModel: Model<Loan>) { }

  async create(createLoanDto: CreateLoanDto) {
    createLoanDto.code = this.generateTransactionNumber();

    // Get the current date
    const currentDate = new Date();

    // Calculate the date 7 days after the current date
    const dateAfter7Days = new Date(currentDate);
    dateAfter7Days.setDate(currentDate.getDate() + 7);

    createLoanDto.loan_date = currentDate;
    createLoanDto.due_date = dateAfter7Days;
    createLoanDto.return_date = null;

    const createdLoan = await this.loanModel.create(createLoanDto);
    return createdLoan;
  }

  private generateTransactionNumber(): string {
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
