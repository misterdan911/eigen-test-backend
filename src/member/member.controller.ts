import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { Response } from 'express';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async findAll(@Res() res: Response) {
    let data = await this.memberService.findAll();

    res.status(HttpStatus.OK).send({
      status: 'success',
      data: data,
    });
  }

}
