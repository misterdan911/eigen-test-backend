import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './member.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }])],
  exports:[MemberService],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
