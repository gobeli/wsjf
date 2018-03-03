import { Controller, Get, Res, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor() {

  }

  @Get('')
  index(@Req() req, @Res() res) {
    res.render('user/user');
  }
}