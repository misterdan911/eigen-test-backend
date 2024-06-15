import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './member.schema';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {

  constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) { }

  async findAll() {

    const books = await this.memberModel.aggregate([
      {
        $lookup: {
          from: 'bookcopies', // The collection name of BookCopy
          localField: 'code',
          foreignField: 'loaned_to',
          as: 'copies',
        },
      },
      {
        $addFields: {
          borrowed_book: {
            $size: '$copies',
          },
        },
      },
      {
        $project: {
          _id: 1,
          code: 1,
          title: 1,
          stock: 1,
          borrowed_book: 1,
        },
      },
    ]);

    return books;    
  }

  async findByCode(code: string) {
    return await this.memberModel.findOne({code: code});
  }

  async updateOne(updateBy: { code: string; }, fieldToUpdate: { penalty_due_date: Date; }) {
    return await this.memberModel.updateOne(updateBy, { $set: fieldToUpdate });
  }

}
