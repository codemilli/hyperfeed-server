import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {AuthService} from "./auth.service";
import {JWTModule} from "./jwt/jwt.module";
import {sessionProviders} from "./session/session.provider";

@Module({
  modules: [DatabaseModule, JWTModule],
  components: [
    AuthService,
    ...sessionProviders
  ],
  exports: [AuthService]
})
export class AuthModule {}
