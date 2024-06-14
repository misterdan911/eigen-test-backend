import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { MustBeRegisteredBookCopy, MustBeRegisteredMember } from '../book-transact.custom.validation';

export class ReturnBookDto {

  code: string;
  
  @ApiProperty()
  @Validate(MustBeRegisteredMember)
  member_code: string;
  
  @ApiProperty()
  @Validate(MustBeRegisteredBookCopy, {each: true})
  bookcopy_code: string[];
  
  transact_type: string;
  transact_date: Date | null;

}
