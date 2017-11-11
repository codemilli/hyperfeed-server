import {Module} from "@nestjs/common";
import {PostService} from "./post.service";
import {postsProviders} from "./post.provider";
import {LinkModule} from "../link/link.module";
import {PostController} from "./post.controller";

@Module({
  modules: [
    LinkModule
  ],
  controllers: [PostController],
  components: [
    PostService,
    ...postsProviders
  ]
})
export class PostModule {}
