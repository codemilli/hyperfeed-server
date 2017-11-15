import {Module, RequestMethod} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {PostModule} from "./post/post.module";
import {MiddlewaresConsumer} from "@nestjs/common/interfaces/middlewares";
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {AuthMiddleware} from "./common/middlewares/auth.middleware";
import {JWTModule} from "./auth/jwt/jwt.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    modules: [
      UserModule,
      PostModule,
      JWTModule,
      AuthModule
    ],
})
export class ApplicationModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply([LoggerMiddleware, AuthMiddleware]).forRoutes(
      {path: '/*', method: RequestMethod.ALL}
    )
  }
}
