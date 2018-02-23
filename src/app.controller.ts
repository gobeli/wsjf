import { Controller, Get, Res } from '@nestjs/common';

 @Controller('')
 export class AppController {
   @Get('')
   login(@Res() res) {
     res.render('index');
   }
 }