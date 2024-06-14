import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './member.schema';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {

  constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) { }

  async findAll() {
    return await this.memberModel.find();
  }

  async findByCode(code: string) {
    return await this.memberModel.findOne({code: code});
  }

  async updateOne(updateBy: { code: string; }, fieldToUpdate: { penalty_due_date: Date; }) {
    return await this.memberModel.updateOne(updateBy, { $set: fieldToUpdate });
  }

}
