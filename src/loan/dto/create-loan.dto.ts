import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, Validate, ValidateNested } from 'class-validator';
import { MustBeRegisteredBook, MustBeRegisteredMember } from '../loan.custom.validation';
import { Type } from 'class-transformer';

class BookLoaned {
  @ApiProperty()
  @Validate(MustBeRegisteredBook)
  book_code: string;
};

export class CreateLoanDto {

  @ApiProperty()
  code: string;

  @ApiProperty()
  @Validate(MustBeRegisteredMember)
  member_code: string;

  @ApiProperty()
  loan_date: Date;

  @ApiProperty()
  due_date: Date;

  @ApiProperty()
  return_date: Date;

  @ApiProperty({ type: [BookLoaned]})
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => BookLoaned)
  book_loaned: BookLoaned[]

}
