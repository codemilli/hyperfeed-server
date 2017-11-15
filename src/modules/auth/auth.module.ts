import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {AuthService} from "./auth.service";
import {JWTModule} from "./jwt/jwt.module";

@Module({
  modules: [DatabaseModule, JWTModule],
  components: [
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule {}
