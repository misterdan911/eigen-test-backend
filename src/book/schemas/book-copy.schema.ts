import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookCopyDocument = HydratedDocument<BookCopy>;

@Schema()
export class BookCopy {

  @Prop()
  code: string;

  @Prop()
  book_code: string;

  @Prop()
  loaned_to: string;

  @Prop()
  loan_due_date: Date | null;

}

export const BookCopySchema = SchemaFactory.createForClass(BookCopy);
