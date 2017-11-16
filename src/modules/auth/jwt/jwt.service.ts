import * as jwt from 'jsonwebtoken'
import {Component} from "@nestjs/common";
import {ENV} from "../../../../config/env/development";
import {CONST} from "../../../infra/const";
import {IAuthToken} from "./token.type";

@Component()
export class JWTService {

  createToken(sid: string, user_id: number, refreshed_times: number): string {
    const token: string = jwt.sign({
      sid,
      user_id,
      refreshed_times
    }, ENV.SESSION_SECRET, {expiresIn: parseInt(String(CONST.twoweeks / 1000))})

    return token
  }

  async verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, ENV.SESSION_SECRET, {},(err, decoded) => {
        if (err)
          return reject(err)

        resolve(decoded)
      })
    })
  }
}
