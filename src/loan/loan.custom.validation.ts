import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BookService } from 'src/book/book.service';

import { MemberService } from 'src/member/member.service';


@ValidatorConstraint({ name: 'mustBeRegisteredMember', async: false })
export class MustBeRegisteredMember implements ValidatorConstraintInterface {

  constructor(private memberService: MemberService) {}

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


@ValidatorConstraint({ name: 'mustBeRegisteredBook', async: false })
export class MustBeRegisteredBook implements ValidatorConstraintInterface {

  constructor(private bookService: BookService) {}

  async validate(text: string) {
    const member = await this.bookService.findByCode(text);

    if (!member) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage() {
    return 'Invalid book code';
  }
}

