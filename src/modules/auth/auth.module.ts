import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {AuthService} from "./auth.service";

@Module({
  modules: [DatabaseModule],
  components: [
    AuthService
  ]
})
export class AuthModule {}
