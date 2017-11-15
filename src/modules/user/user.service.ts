import {Component, Inject} from "@nestjs/common";
import {Model} from "sequelize-typescript";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersRepository} from "./user.provider";
import * as bcrypt from 'bcrypt'
import {AuthService} from "../auth/auth.service";

@Component()
export class UserService {
  constructor(
    @Inject(UsersRepository) private readonly userRepository: typeof Model,
    private readonly authService: AuthService) {}

  async create(createUserDto: CreateUserDto, useragent: string): Promise<Object> {
    const user = new User()
    const {email, username, password} = createUserDto
    const salt = await this.getSalt()
    const hashed = await this.hashing(password, salt)

    user.email = email
    user.username = username
    user.password = hashed
    user.secret = salt
    user.password_reset_token = ''
    user.password_reset_expires = null

    const newUser = await user.save()
    const token = await this.authService.create(newUser.id, useragent)

    return {
      token
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>()
  }

  async getSalt():Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt: string) => {
        if (err)
          return reject(err)
        resolve(salt)
      })
    })
  }

  async hashing(password: string, salt: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hashed) => {
        if (err)
          return reject(err)
        resolve(hashed)
      })
    })
  }
}
