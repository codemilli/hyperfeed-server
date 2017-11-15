import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database/database.module";
import {JWTService} from "./jwt.service";
import {sessionProviders} from "../session/session.provider";

@Module({
  modules: [DatabaseModule],
  components: [
    JWTService,
    ...sessionProviders
  ],
  exports: [JWTService]
})
export class JWTModule {}
