import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordService } from './password.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import CheckLoginResult from './custom.type';
import { ZodiacService } from './zodiac.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
    private readonly zodiacService: ZodiacService,
  ) { }

  async register(registerUserDto: RegisterUserDto) {
    registerUserDto.password = await this.passwordService.hashPassword(
      registerUserDto.password,
    );
    const createdUser = await this.userModel.create(registerUserDto);
    return createdUser;
  }

  async getUserByUsername(userName: string) {
    const user = await this.userModel.findOne({ username: userName });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async checkUserLogin(loginUserDto: LoginUserDto): Promise<CheckLoginResult> {

    console.log('loginUserDto', loginUserDto);

    const loginResult: CheckLoginResult = {
      status: 'failed',
      user: {},
    };

    let user = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      user = await this.userModel.findOne({ email: loginUserDto.email });

      if (!user) {
        loginResult.status = 'failed';
        return loginResult;
      }
    }


    const passwordMatch = await this.passwordService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!passwordMatch) {
      loginResult.status = 'failed';
      return loginResult;
    }

    loginResult.status = 'success';
    loginResult.user = user;

    return loginResult;
  }

  async createProfile(userId: string, createProfileDto: CreateProfileDto) {

    createProfileDto.horoscope = this.zodiacService.getHoroscope(createProfileDto.birthday);
    createProfileDto.zodiac = this.zodiacService.convertDateToShio(createProfileDto.birthday);
    let result = await this.userModel.updateOne({ _id: userId }, createProfileDto);

    if (result.acknowledged) {
      let user = await this.userModel.findOne({ _id: userId }).select(['-password', '-_id', '-__v']);
      return { status: 'success', user: user };
    } else {
      return { status: 'failed', user: {} };
    }
  }

  async getProfile(userId: string) {
    let user = await this.userModel.findOne({ _id: userId }).select(['-password', '-_id', '-__v']);

    if (user) {
      return { status: 'success', user: user };
    } else {
      return { status: 'failed', user: {} };
    }
  }

}