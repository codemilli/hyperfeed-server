import {Module} from "@nestjs/common";
import {LinkService} from "./link.service";
import {linksProviders} from "./link.provider";

@Module({
  components: [
    LinkService,
    ...linksProviders
  ]
})
export class LinkModule {}
