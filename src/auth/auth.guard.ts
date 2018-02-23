import { Guard, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Guard()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  async canActivate(req, context: ExecutionContext) {
    return req.session.passport && !!req.session.passport.user;
  }
}
