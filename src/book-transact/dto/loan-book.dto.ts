import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, Validate } from 'class-validator';
import { CannotLoanBorrowedBook, MemberNotPenalized, MustBeRegisteredBookCopy, MustBeRegisteredMember } from '../book-transact.custom.validation';

export class LoanBookDto {

  code: string;
  
  @ApiProperty()
  @Validate(MustBeRegisteredMember)
  @Validate(MemberNotPenalized)
  member_code: string;
  
  @ApiProperty()
  @ArrayMaxSize(2)
  @Validate(MustBeRegisteredBookCopy, {each: true})
  @Validate(CannotLoanBorrowedBook, {each: true})
  bookcopy_code: string[];
  
  transact_type: string;
  transact_date: Date | null;

}
