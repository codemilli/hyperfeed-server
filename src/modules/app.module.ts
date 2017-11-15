import {Module, RequestMethod} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {PostModule} from "./post/post.module";
import {MiddlewaresConsumer} from "@nestjs/common/interfaces/middlewares";
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";

@Module({
    modules: [
      UserModule,
      PostModule
    ],
})
export class ApplicationModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(
      {path: '/*', method: RequestMethod.ALL}
    )
  }
}
