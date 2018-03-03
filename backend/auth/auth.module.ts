import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportGoogleService } from "./passport.google.service";
import * as passport from 'passport';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "./auth.guard";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  components: [PassportGoogleService, AuthGuard],
  exports: [AuthGuard]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('google', {
          scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
      }))
      .forRoutes({ path: '/auth/google', method: RequestMethod.GET })
      // google CallBack URL
      .apply(passport.authenticate('google', {
          successRedirect: '/user',
          failureRedirect: '/error'
      }))
      .forRoutes({ path: '/auth/google/callback', method: RequestMethod.GET })
  }
}