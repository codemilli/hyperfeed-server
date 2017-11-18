import {Component, Inject} from "@nestjs/common";
import {Model} from "sequelize-typescript";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersRepository} from "./user.provider";
import * as bcrypt from 'bcrypt'
import {AuthService} from "../auth/auth.service";
import {LoginUserDto} from "./dto/login-user.dto";

@Component()
export class UserService {
  constructor(
    @Inject(UsersRepository) private readonly userRepository: typeof Model,
    private readonly authService: AuthService) {}

  async create(createUserDto: CreateUserDto, useragent: string): Promise<any> {
    let newUser = new User()
    const {email, username, password} = createUserDto
    const salt = await this.getSalt()
    const hashed = await this.hashing(password, salt)

    newUser.email = email
    newUser.username = username
    newUser.password = hashed
    newUser.secret = salt
    newUser.password_reset_token = ''
    newUser.password_reset_expires = null

    const createdUser = await newUser.save()
    const token = await this.authService.createSession(createdUser.id, useragent)
    const user = await this.findUserById(createdUser.id)

    return {
      user,
      token
    }
  }

  async login(loginUserDto: LoginUserDto, useragent: string): Promise<any> {
    const user = await this.findUserByUsername(loginUserDto.username)
    const {password} = user
    const result = await bcrypt.compare(loginUserDto.password, password)

    if (result) {
      const token = await this.authService.createSession(user.id, useragent)
      const foundUser = await this.findUserById(user.id)

      return {
        user: foundUser,
        token
      }
    }

    return null
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findById<User>(id)
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.scope('full').findOne<User>({
      where: {
        username
      }
    })
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
