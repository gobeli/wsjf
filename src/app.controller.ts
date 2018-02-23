import { Controller, Get, Res, Req } from '@nestjs/common';

 @Controller('')
 export class AppController {
   @Get('')
   login(@Req() req, @Res() res) {
     if (req.session && req.session.passport && req.session.passport.user) {
       return res.redirect('/user');
     } 
     res.render('index');
   }
 }