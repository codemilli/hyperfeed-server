import * as jwt from 'jsonwebtoken'
import * as uuidv1 from 'uuid/v1'
import {Component, Inject} from "@nestjs/common";
import {Model} from "sequelize-typescript";
import {SessionsRepository} from "../session/session.provider";
import {Session} from "../session/session.entity";
import {ENV} from "../../../../config/env/development";

const twoweek = 14 * 24 * 60 * 60 * 1000

@Component()
export class JWTService {
  constructor(@Inject(SessionsRepository) private readonly sessionRepository: typeof Model) {}

  async create(userId: number, useragent: string): Promise<string> {
    const expires = Date.now() + twoweek
    const session = new Session({
      sid: uuidv1(),
      user_id: userId,
      expires: new Date(expires),
      data: useragent
    })

    const newSess = await session.save()
    const token: string = jwt.sign({
      sid: newSess.sid,
      user_id: newSess.user_id,
      useragent
    }, ENV.SESSION_SECRET, {expiresIn: parseInt(String(twoweek / 1000))})

    return token
  }

  async findOne(): Promise<Session> {
    return await this.sessionRepository.findOne<Session>()
  }
}
