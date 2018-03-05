import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import User from "./user.entity";

@Component()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  findById(id) {
    return this.userRepository.findOneById(id);
  }

  findUserByGoogleId(id) {
    return this.userRepository.findOne({ googleId: id });
  }

  saveUser(user: User) {
    return this.userRepository.save(user);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ email: email });
  }

  async authUser(email, password, done) {
    const user = await this.findUserByEmail(email);
    if (user) {
      if (user.validatePassword(password)) {
        return done(undefined, user);
      }
    }
    return done(undefined, false, { message: "Invalid email or password." });
  }
}