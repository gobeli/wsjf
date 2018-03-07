import { UserService } from './../shared/user/user.service';
import { Controller, Get, Res, Req, UseGuards, Post, Body } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { validate } from 'class-validator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {

  }

  @Get('')
  async index(@Req() req, @Res() res) {
    const user = await this.userService.findById(req.session.passport.user.id);
    res.render('user/user', {user});
  }

  @Post('info')
  async setInfo(@Body() userInfo, @Req() req, @Res() res) {
    try {
      let user = await this.userService.findById(req.session.passport.user.id);
      user = Object.assign(user, userInfo);
      user = await this.userService.saveUser(user);
      const errors = await validate(user);
      if (!errors.length) {
        req.session.flash = { type: 'success', message: 'Infos saved.' };
      } else {
        req.session.flash = { type: 'error', message: errors[0].constraints.isEmail };
      }
    } catch(e) {
      req.session.flash = { type: 'error', message: e.message || 'Failed to save infos!' };
    }
    res.redirect('/user');
  }

  @Post('password')
  async setPassword(@Body() { oldPassword, password, repeatPassword  }, @Req() req, @Res() res) {
    const user = await this.userService.findById(req.session.passport.user.id);
    if ((!oldPassword && !user.password) || user.validatePassword(oldPassword )) {
      if (password === repeatPassword) {
        user.hashPassword(password);
        await this.userService.saveUser(user);
        req.session.flash = { type: 'success', message: 'Password updated.' };
      } else {
        req.session.flash = { type: 'error', message: 'Passwords do not match!' };
      }
    } else {
      req.session.flash = { type: 'error', message: 'Old password was wrong!' };
    }
    res.redirect('/user');
  }
}