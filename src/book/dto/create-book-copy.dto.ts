import { ApiProperty } from "@nestjs/swagger";

export class CreateBookCopyDto {

    @ApiProperty()
    code: string;
  
    @ApiProperty()
    book_code: string;
  
    @ApiProperty()
    loaned_to: string;
  
    @ApiProperty()
    loan_due_date: Date | null;
  
}
