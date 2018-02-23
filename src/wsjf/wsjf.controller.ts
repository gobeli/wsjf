import { Controller, Get, Res, Req, UseGuards, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { Planning } from './entities/planning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../shared/user/user.service';

@Controller('wsjf')
@UseGuards(AuthGuard) 
export class WsjfController {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>, 
    @InjectRepository(Planning) private planningRepository: Repository<Planning>,
    private userService: UserService
  ){}

  getUserId(req) {
    return req.session && req.session.passport && req.session.passport.user && req.session.passport.user.id;
  }

  @Get('') 
  async index(@Req() req, @Res() res) {
    const plannings = await this.planningRepository.find({ where: { user: this.getUserId(req) } });
    res.render('wsjf/wsjf', {plannings});
  }

  @Post('planning')
  async postPlanning(@Body('name') name: string, @Req() req) {
    if (!name) {
      throw new HttpException('Name not defined', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.findById(this.getUserId(req));
    console.log(this.getUserId(req));
    return await this.planningRepository.save(<Planning>{ name, user });
  }
  
}