import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanSchema } from './loan.schema';
import { MemberModule } from 'src/member/member.module';
import { MemberNotPenalized, MustBeRegisteredBook, MustBeRegisteredMember } from './loan.custom.validation';
import { BookModule } from 'src/book/book.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Loan', schema: LoanSchema }]),
    MemberModule,
    BookModule,
  ],
  controllers: [LoanController],
  providers: [
    LoanService,
    MustBeRegisteredMember,
    MustBeRegisteredBook,
    MemberNotPenalized,
  ],
})
export class LoanModule { }
