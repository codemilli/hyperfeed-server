import {Component, Inject} from "@nestjs/common";
import {Model} from "sequelize-typescript";
import {SessionsRepository} from "./session/session.provider";
import {Session} from "./session/session.entity";

@Component()
export class AuthService {
  constructor(@Inject(SessionsRepository) private readonly sessionRepository: typeof Model) {}

  async create(): Promise<Session> {
    const session = new Session()
    return await session.save()
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>()
  }
}
