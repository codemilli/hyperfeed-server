import {Body, Controller, Get, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto)
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }
}
