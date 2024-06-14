import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import LoginResult from './custom.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  @Inject(UserService)
  private readonly userService: UserService;

  async register(registerUserDto: RegisterUserDto) {
    const createdUser = await this.userService.register(registerUserDto);
    return createdUser;
  }

  async login(loginUserDto: LoginUserDto) {
    
    const loginResult: LoginResult = {
      status: 'failed',
      access_token: '',
    };

    const result = await this.userService.checkUserLogin(loginUserDto);

    if (result.status == 'failed') {
      loginResult.status = 'failed';
      return loginResult;
    }

    const payload = {
      username: loginUserDto.username,
      sub: result.user._id,
    };

    loginResult.status = 'success';
    loginResult.access_token = await this.jwtService.signAsync(payload);

    return loginResult;
  }

  validate(payload) {
    return { userId: payload.sub, username: payload.username };
  }
}
