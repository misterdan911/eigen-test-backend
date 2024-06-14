import { Controller, Post, Body, Res, HttpStatus, Inject } from '@nestjs/common';
import { BookTransactService } from './book-transact.service';
import { LoanBookDto } from './dto/loan-book.dto';
import { Response } from 'express';
import { ReturnBookDto } from './dto/return-book.dto';
import { BookService } from 'src/book/book.service';

@Controller('book-transact')
export class BookTransactController {

  @Inject(BookService)
  private readonly bookService: BookService;

  constructor(private readonly bookTransactService: BookTransactService) { }

  @Post('loan')
  createLoan(@Res() res: Response, @Body() loanBookDto: LoanBookDto) {
    this.bookTransactService.createLoan(loanBookDto);

    res.status(HttpStatus.CREATED).send({
      status: 'success',
      data: loanBookDto,
    });
  }

  @Post('return')
  async returnLoan(@Res() res: Response, @Body() returnBookDto: ReturnBookDto) {

    // check if the returned book is a book that the member has borrowed
    let arrErrMsg = [];

    for (let i=0; returnBookDto.bookcopy_code.length > i; i++) {
      let bookCopyCode = returnBookDto.bookcopy_code[i];
      let result = await this.bookService.checkIfReturnedBookValid(bookCopyCode, returnBookDto.member_code);

      if (!result) {
        arrErrMsg.push(`Book copy code: '${bookCopyCode}' is not a book that the member has borrowed`);
      }
    }

    if (arrErrMsg.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: arrErrMsg,
        error: "Bad Request",
        statusCode: 400
      });

      return false;
    }

    // return the book
    await this.bookTransactService.returnLoan(returnBookDto);

    res.status(HttpStatus.CREATED).send({
      status: 'success',
      data: returnBookDto,
    });
  }

}
