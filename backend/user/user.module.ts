import { UserController } from "./user.controller";
import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [UserController]
})
export class UserModule {

}