import { Component } from '@nestjs/common';
import passportLocal from "passport-local";
import * as passport from 'passport';


const LocalStrategy = passportLocal.Strategy;

@Component()
export class PassportLocalService extends LocalStrategy {
  constructor() {
    super({ usernameField: 'email' }, (email, password, done) => {

    });
  }
}