import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {LinkModule} from "./link/link.module";

@Module({
    modules: [
      UserModule
    ],
})
export class ApplicationModule {}
