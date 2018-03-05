import { UserService } from './../shared/user/user.service';
import { Component } from '@nestjs/common';
import * as passportLocal from "passport-local";
import * as passport from 'passport';


const LocalStrategy = passportLocal.Strategy;

@Component()
export class PassportLocalService extends LocalStrategy {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' }, userService.authUser.bind(userService));

    passport.use(this);
  }
}