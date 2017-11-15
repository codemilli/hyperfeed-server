import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {usersProviders} from "./user.provider";
import {AuthModule} from "../auth/auth.module";

@Module({
  modules: [DatabaseModule, AuthModule],
  controllers: [UserController],
  components: [
    UserService,
    ...usersProviders
  ]
})
export class UserModule {}
