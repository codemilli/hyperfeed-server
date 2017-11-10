import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {PostService} from "./post.service";
import {Post} from "./post.entity";
import {CreatePostDto} from "./dto/create-post.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    const result = await this.postService.create(createPostDto)
    return result
  }

  @Get('/list')
  async findAll(): Promise<Post[]> {
    return await this.postService.findAll()
  }
}
