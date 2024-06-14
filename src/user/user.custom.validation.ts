import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  // ValidationArguments,
} from 'class-validator';
import { UserService } from './user.service';
@ValidatorConstraint({ name: 'usernameMustBeUnique', async: false })
export class UsernameMustBeUnique implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  // async validate(text: string, args: ValidationArguments) {
  async validate(text: string) {
    const user = await this.userService.getUserByUsername(text);

    if (user) {
      return false;
    } else {
      return true; // for async validations you must return a Promise<boolean> here
    }
  }

  // defaultMessage(args: ValidationArguments) {
  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Username already exists';
  }
}

@ValidatorConstraint({ name: 'emailMustBeUnique', async: false })
export class EmailMustBeUnique implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  // async validate(text: string, args: ValidationArguments) {
  async validate(text: string) {
    const user = await this.userService.getUserByEmail(text);

    if (user) {
      return false;
    } else {
      return true; // for async validations you must return a Promise<boolean> here
    }
  }

  // defaultMessage(args: ValidationArguments) {
  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Email already exists';
  }
}
