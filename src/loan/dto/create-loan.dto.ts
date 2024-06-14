import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, Validate, ValidateNested } from 'class-validator';
import { MemberNotPenalized, MustBeRegisteredBook, MustBeRegisteredMember } from '../loan.custom.validation';
import { Type } from 'class-transformer';

class BookLoaned {
  @ApiProperty()
  @Validate(MustBeRegisteredBook)
  book_code: string;
};

export class CreateLoanDto {

  code: string;

  @ApiProperty()
  @Validate(MustBeRegisteredMember)
  @Validate(MemberNotPenalized)
  member_code: string;

  loan_date: Date;

  due_date: Date;

  return_date: Date;

  @ApiProperty({ type: [BookLoaned]})
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => BookLoaned)
  book_loaned: BookLoaned[]

}
