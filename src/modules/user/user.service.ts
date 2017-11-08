import {Component, Inject} from "@nestjs/common";
import {} from "./user.provider";
import {UsersRepository} from "./user.provider";
import {Model} from "sequelize-typescript";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

@Component()
export class UserService {
  constructor(@Inject(UsersRepository) private readonly userRepository: typeof Model) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>()
  }
}
