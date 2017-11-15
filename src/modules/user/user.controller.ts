import {Body, Controller, Get, Post, Req, Res} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Req() req, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto, req.get('User-Agent'))
    return result
  }

  @Get('/list')
  async findAll(@Req() req): Promise<User[]> {
    return await this.userService.findAll()
  }
}
