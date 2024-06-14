import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookTransactDocument = HydratedDocument<BookTransact>;

@Schema()
export class BookTransact {
  
  @Prop()
  code: string;
  
  @Prop()
  member_code: string;
  
  @Prop()
  bookcopy_code: string;
  
  @Prop()
  transact_type: string;

  @Prop()
  transact_date: Date | null;

}

export const BookTransactSchema = SchemaFactory.createForClass(BookTransact);
