import {Body, Controller, Get, Post, Put, Req, Res, UseInterceptors} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {ResponseMapperInterceptor} from "../common/interceptors/response-mapper.interceptor";
import {LoginUserDto} from "./dto/login-user.dto";

@UseInterceptors(ResponseMapperInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Req() req, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto, req.get('User-Agent'))
    const {user, token} = result

    req.res._token = token
    return user
  }

  @Post('/login')
  async login(@Req() req, @Body() loginUserDto: LoginUserDto) {
    const result = await this.userService.login(loginUserDto, req.get('User-Agent'))
    const {user, token} = result

    req.res._token = token
    return user
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
