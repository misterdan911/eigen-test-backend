import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {

  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) { }

  async findAll() {
    return await this.bookModel.find();
  }

  async findByCode(code: string) {
    return await this.bookModel.findOne({code: code});
  }

}
