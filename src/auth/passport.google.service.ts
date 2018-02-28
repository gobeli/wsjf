import { OAuth2Strategy } from 'passport-google-oauth';
import { Component } from '@nestjs/common';
import * as passport from 'passport';
import * as HttpsProxyAgent from 'https-proxy-agent';
import { UserService } from '../shared/user/user.service';
import { IUserModel } from '../shared/user/user.model';
import User from '../shared/user/user.entity';

const proxy = {host:'proxy.corproot.net',port:8079};
const proxyAgent = new HttpsProxyAgent(proxy);
const { HOST, HOST_PORT, HOST_SCHEMA, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

@Component()
export class PassportGoogleService extends OAuth2Strategy {
  constructor(private userService: UserService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${HOST_SCHEMA}://${HOST}:${HOST_PORT}/auth/google/callback`,
      passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
      const user: IUserModel = {
        email: profile.emails[0].value,
        image: profile._json.image.url,
        displayName: profile.displayName,
        googleId: profile.id,
        googleToken: accessToken
      };

      let u = await this.userService.findUserByGoogleId(user.googleId);
      if (!u) {
        await this.userService.saveUser(<User>user);
      }
      return done(null, u);
    });

    this['_oauth2'].setAgent(proxyAgent);

    passport.use(this);

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }
}