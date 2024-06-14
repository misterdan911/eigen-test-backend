import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Response } from 'express';

@Controller('loan')
export class LoanController {

  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto, @Res() res: Response) {
    let data = await this.loanService.create(createLoanDto);

    res.status(HttpStatus.CREATED).send({
      status: 'success',
      data: data,
    });
  }

}
