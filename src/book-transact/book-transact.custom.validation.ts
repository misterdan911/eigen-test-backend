import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BookService } from 'src/book/book.service';
import { MemberService } from 'src/member/member.service';


@ValidatorConstraint({ name: 'mustBeRegisteredMember', async: false })
export class MustBeRegisteredMember implements ValidatorConstraintInterface {

  constructor(private memberService: MemberService) { }

  async validate(text: string) {
    const member = await this.memberService.findByCode(text);

    if (!member) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage() {
    return 'Invalid member code';
  }
}


@ValidatorConstraint({ name: 'memberNotPenalized', async: false })
export class MemberNotPenalized implements ValidatorConstraintInterface {

  constructor(private memberService: MemberService) { }

  async validate(text: string) {
    const member = await this.memberService.findByCode(text);

    if (!member) {
      return true;  // supaya gak tampil errornya kalo member code nya invalid
    }

    if (member.penalty_due_date == null) {
      return true;
    }

    // Get today's date
    let today = new Date();
    let futureDateFromDB = new Date(member.penalty_due_date);
    let futureDateLocal = new Date(futureDateFromDB.toLocaleString());

    console.log(`${today} > ${member.penalty_due_date}`);

    // Check if today's date has past the future date
    if (today > futureDateLocal) {
      return true;
    } else {
      return false;
    }

  }

  defaultMessage() {
    return 'User under penalty';
  }
}

@ValidatorConstraint({ name: 'mustBeRegisteredBookCopy', async: false })
export class MustBeRegisteredBookCopy implements ValidatorConstraintInterface {

  constructor(private bookService: BookService) { }

  async validate(text: string) {
    const bookCopy = await this.bookService.findBookCopyByCode(text);

    if (!bookCopy) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage() {
    return 'Invalid book copy code';
  }
}

@ValidatorConstraint({ name: 'cannotLoanBorrowedBook', async: false })
export class CannotLoanBorrowedBook implements ValidatorConstraintInterface {

  constructor(private bookService: BookService) { }

  async validate(text: string) {
    const bookCopy = await this.bookService.findBookCopyByCode(text);

    if (bookCopy.loaned_to && bookCopy.loaned_to != null) {
      return false;
    } else {
      return true;
    }

  }

  defaultMessage() {
    return 'Book is already borrowed';
  }
}

