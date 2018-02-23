import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./user/user.entity";
import { UserService } from "./user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [UserService],
  exports: [UserService]
})
export class SharedModule {

}