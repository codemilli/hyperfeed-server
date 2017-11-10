import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {PostModule} from "./post/post.module";

@Module({
    modules: [
      UserModule,
      PostModule
    ],
})
export class ApplicationModule {}
