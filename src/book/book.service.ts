import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { BookCopy } from './schemas/book-copy.schema';

@Injectable()
export class BookService {

  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    @InjectModel('BookCopy') private readonly bookCopyModel: Model<BookCopy>
  ) { }

  async findAll() {
    return await this.bookModel.find();
  }

  async findByCode(code: string) {
    return await this.bookModel.findOne({ code: code });
  }

  async createCopy(createBookCopyDto: CreateBookCopyDto) {
    return await this.bookCopyModel.create(createBookCopyDto);
  }

  async setLoanToAndLoanDueDate(bookCopyCode: string, memberCode: string) {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date 7 days after the current date
    const dateAfter7Days = new Date(currentDate);
    dateAfter7Days.setDate(currentDate.getDate() + 7);

    return await this.bookCopyModel.updateOne({ code: bookCopyCode }, { $set: { loaned_to: memberCode, loan_due_date: dateAfter7Days } });
  }

  async unsetLoanToAndLoanDueDate(bookCopyCode: string) {
    return await this.bookCopyModel.updateOne({ code: bookCopyCode }, { $unset: { loaned_to: "", loan_due_date: "" } });
  }

  async findBookCopyByCode(code: string) {
    return await this.bookCopyModel.findOne({ code: code });
  }

  async checkIfReturnedBookValid(bookCopyCode: string, memberCode: string): Promise<boolean> {
    let result = await this.bookCopyModel.findOne({ code: bookCopyCode, loaned_to: memberCode });

    // console.log('code', result.code);
    // console.log('book_code', result.book_code);

    if (result) {
      return true;
    } else {
      return false;
    }
  }

}
