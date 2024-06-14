import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { BookTransactService } from './book-transact.service';
import { LoanBookDto } from './dto/loan-book.dto';
import { Response } from 'express';

@Controller('book-transact')
export class BookTransactController {
  constructor(private readonly bookTransactService: BookTransactService) { }

  @Post('loan')
  createLoan(@Res() res: Response, @Body() loanBookDto: LoanBookDto) {
    this.bookTransactService.createLoan(loanBookDto);

    res.status(HttpStatus.CREATED).send({
      status: 'success',
      data: loanBookDto,
    });
  }

  /*
  @Post('returnloan')
  createReturn(@Body() createBookTransactDto: CreateBookTransactDto) {
    return this.bookTransactService.createReturn(createBookTransactDto);
  }
    */

}
