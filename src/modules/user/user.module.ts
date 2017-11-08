import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {usersProviders} from "./user.provider";

@Module({
  modules: [DatabaseModule],
  controllers: [UserController],
  components: [
    UserService,
    ...usersProviders
  ]
})
export class UserModule {}
