import {Module} from "@nestjs/common";
import {PostService} from "./post.service";
import {postsProviders} from "./post.provider";
import {LinkModule} from "../link/link.module";

@Module({
  modules: [
    LinkModule
  ],
  components: [
    PostService,
    ...postsProviders
  ]
})
export class PostModule {}
