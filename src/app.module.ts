import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { LoanModule } from './loan/loan.module';
import { BookTransactModule } from './book-transact/book-transact.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/eigen_interview_test'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UserModule,
    MemberModule,
    BookModule,
    LoanModule,
    BookTransactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
