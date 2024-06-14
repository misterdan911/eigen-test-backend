import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LoanDocument = HydratedDocument<Loan>;

type BookLoaned = {
  book_code: string;
};

@Schema()
export class Loan {
  
  @Prop()
  code: string;
  
  @Prop()
  member_code: string;
  
  @Prop()
  loan_date: Date;
  
  @Prop()
  due_date: Date;

  @Prop()
  return_date: Date | null;

  @Prop()
  book_loaned: Array<BookLoaned>

}

export const LoanSchema = SchemaFactory.createForClass(Loan);
