import { Controller, Post, UseGuards, Request, Body, Put, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@ApiHeader({
  name: 'x-access-token',
  description: 'Access token',
})
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({ description: 'Profile has been created'})
  @UseGuards(AuthGuard)
  @Post('createProfile')
  async createProfile(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    let result = await this.userService.createProfile(req.user.sub, createProfileDto);

    if (result.status == 'success') {
      return {
        message: "Profile has been created successfully",
        data: result.user
      };
    }
    else {
      return {
        message: "Profile failed to be created",
      };
    }
  }

  @ApiOkResponse({ description: 'Profile has been updated'})
  @UseGuards(AuthGuard)
  @Put('updateProfile')
  async updateProfile(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    let result = await this.userService.createProfile(req.user.sub, createProfileDto);

    if (result.status == 'success') {
      return {
        message: "Profile has been updated successfully",
        data: result.user
      };
    }
    else {
      return {
        message: "Profile failed to be updated",
      };
    }
  }

  @ApiOkResponse({ description: 'Profile has been found'})
  @UseGuards(AuthGuard)
  @Get('getProfile')
  async getProfile(@Request() req) {
    let result = await this.userService.getProfile(req.user.sub);

    if (result.status == 'success') {
      return {
        message: "Profile has been found successfully",
        data: result.user
      };
    }
    else {
      return {
        message: "Profile failed to be found",
      };
    }
  }



}
