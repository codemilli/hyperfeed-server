import {Middleware} from "@nestjs/common";
import {ExpressMiddleware, NestMiddleware} from "@nestjs/common/interfaces/middlewares";
import {JWTService} from "../../auth/jwt/jwt.service";
import {AuthService} from "../../auth/auth.service";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly authService: AuthService) {}

  resolve(...args: any[]): ExpressMiddleware {
    return async (req, res, next) => {
      const token = req.headers['hf-token']

      if (token) {
        const verified = await this.jwtService.verifyToken(token);
        const {sid, user_id, useragent} = verified
        const session = await this.authService.verifySession(sid, user_id)

        req._session = session
        req._token = this.jwtService.createToken(sid, user_id, useragent)

        /** @Async <Never await this method> */
        this.authService.updateSession(verified)
      } else {
        req._session = null
      }
      next()
    }
  }
}
