import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { Response } from 'express';
import LoginResult from './custom.type';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User has been created successfully'})
  register(@Body() registerUserDto: RegisterUserDto) {
    this.authService.register(registerUserDto);
    return { message: 'User has been created successfully' };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const loginResult: LoginResult = await this.authService.login(loginUserDto);

    if (loginResult.status == 'failed') {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'User not found',
      });
    }

    res.status(HttpStatus.OK).send({
      message: 'User has been logged in successfully',
      access_token: loginResult.access_token,
    });
  }
}
