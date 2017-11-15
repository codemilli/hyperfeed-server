import {Body, Controller, Get, Post, Put, Req, Res} from "@nestjs/common";
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

  @Put()
  async update(@Req() req) {
    const session = req._session
    return session
  }

  @Get('/list')
  async findAll(@Req() req): Promise<User[]> {
    console.log('/list session: ', req._session.user.id)

    return await this.userService.findAll()
  }
}
