import { Controller, Get, Res, Req, UseGuards, Body, Post, HttpException, HttpStatus, Delete, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { Planning } from './entities/planning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../shared/user/user.service';

@Controller('wsjf')
@UseGuards(AuthGuard)
export class PlanningController {
  constructor(
    @InjectRepository(Planning) private planningRepository: Repository<Planning>,
    private userService: UserService
  ){}

  getUserId(req) {
    return req.session && req.session.passport && req.session.passport.user && req.session.passport.user.id;
  }

  @Get('')
  async index(@Res() res) {
    res.render('wsjf/wsjf');
  }

  @Get('planning/:id')
  async getOne(@Param('id') id) {
    return await this.planningRepository.findOneById(id);
  }

  @Get('planning')
  async getAll(@Req() req) {
    return await this.planningRepository
      .find({ where: { user: this.getUserId(req) }, relations: ['stories'] });
  }

  @Post('planning')
  async postPlanning(@Body('name') name: string, @Body('id') id: string, @Req() req) {
    if (!name) {
      throw new HttpException('Name not defined', HttpStatus.BAD_REQUEST);
    }
    let planning = <Planning>{ name };
    if (id) {
      planning = await this.planningRepository.findOneById(id);
      planning.name = name;
    } else {
      const user = await this.userService.findById(this.getUserId(req));
      planning.user = user;
    }
    return await this.planningRepository.save(planning);
  }

  @Delete('planning/:id')
  async deletePlanning(@Param('id') id, @Req() req) {
    return await this.planningRepository.deleteById(id);
  }
}