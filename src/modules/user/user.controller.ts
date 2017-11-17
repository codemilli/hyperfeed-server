import {Body, Controller, Get, Post, Put, Req, Res, UseInterceptors} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {ResponseMapperInterceptor} from "../common/interceptors/response-mapper.interceptor";

@UseInterceptors(ResponseMapperInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Req() req, @Res() res, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto, req.get('User-Agent'))

    res._token = result.token

    console.log('result', result)

    return result
  }

  @Put()
  async update(@Req() req) {
    const session = req._session
    return session
  }

  @Get('/list')
  async findAll(@Req() req): Promise<User[]> {
    return await this.userService.findAll()
  }
}
