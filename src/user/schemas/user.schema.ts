import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // _id: Types.ObjectId

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
