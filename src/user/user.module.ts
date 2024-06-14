import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsernameMustBeUnique, EmailMustBeUnique } from './user.custom.validation';
import { PasswordService } from './password.service';
import { ZodiacService } from './zodiac.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    UsernameMustBeUnique,
    EmailMustBeUnique,
    PasswordService,
    ZodiacService
  ],
  exports: [UserService],
})
export class UserModule {}
