import { UserService } from './../shared/user/user.service';
import { Controller, Get, Res, Req, Next, Body, Post } from '@nestjs/common';
import * as passport from 'passport';
import User from '../shared/user/user.entity';

@Controller("auth")
export class AuthController {
  constructor(private userService: UserService) { }

  @Get("google/callback")
  public async googleCallback() {

  }

  @Get("google")
  public async googleSignIn() {

  }

  @Get('email')
  public async emailSignIn() {

  }

  @Post('local')
  async login(@Body('email') email, @Body('password') password, @Req() req, @Res() res) {
    const user = await this.userService.findUserByEmail(email);
    let success = true;
    if (user) {
      success = await this.loginUser(user, password, req);
    } else {
      success = await this.registerUser(new User({ email, password }), req);
    }

    if (success) {
      res.redirect('/user');
    } else {
      req.session.flash = { type: 'error', message: 'Login failed!' };
      res.redirect('/');
    }
  }

  async registerUser(user: User, req) {
    user = await this.userService.saveUser(user);
    if (user) {
      req.session.flash = { type: 'sucess', message: 'Successfully registered!' };
      req.session.userId = user.id;
      return true;
    } else {
      return false;
    }
  }

  async loginUser(user: User, password, req) {
    if (user.validatePassword(user.password)) {
      req.session.flash = { type: 'sucess', message: 'Successfully logged in!' };
      req.session.userId = user.id;
      return true;
    }
  }
}