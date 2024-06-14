import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {

  @Prop()
  code: string;

  @Prop()
  name: string;

}

export const MemberSchema = SchemaFactory.createForClass(Member);
