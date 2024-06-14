import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { Response } from 'express';

@Controller('book')
export class BookController {

  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Res() res: Response) {
    let data = await this.bookService.findAll();

    res.status(HttpStatus.OK).send({
      status: 'success',
      data: data,
    });

  }

}
