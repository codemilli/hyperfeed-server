import {Module} from "@nestjs/common";
import {PostService} from "./post.service";
import {postsProviders} from "./post.provider";
import {PostController} from "./post.controller";
import {LinkService} from "../link/link.service";
import {linksProviders} from "../link/link.provider";

@Module({
  controllers: [PostController],
  components: [
    PostService,
    ...postsProviders,
    LinkService,
    ...linksProviders
  ]
})
export class PostModule {}
