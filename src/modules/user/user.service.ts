import {Component, Inject} from "@nestjs/common";
import {Model} from "sequelize-typescript";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersRepository} from "./user.provider";

@Component()
export class UserService {
  constructor(@Inject(UsersRepository) private readonly userRepository: typeof Model) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()

    user.email = createUserDto.email
    user.username = createUserDto.username
    user.password = createUserDto.password

    return await user.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>()
  }
}
