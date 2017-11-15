import {Component, Inject} from "@nestjs/common";
import {JWTService} from "./jwt/jwt.service";

@Component()
export class AuthService {
  constructor(private readonly jwtService: JWTService) {}

  async create(userId: number, useragent: string): Promise<string> {
    return await this.jwtService.create(userId, useragent)
  }
}
