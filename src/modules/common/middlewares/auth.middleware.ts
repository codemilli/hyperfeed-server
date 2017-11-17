import {Middleware} from "@nestjs/common";
import {ExpressMiddleware, NestMiddleware} from "@nestjs/common/interfaces/middlewares";
import {JWTService} from "../../auth/jwt/jwt.service";
import {AuthService} from "../../auth/auth.service";
import {ENV} from "../../../../config/env/development";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly authService: AuthService) {}

  resolve(...args: any[]): ExpressMiddleware {
    return async (req, res, next) => {
      const token = req.headers[ENV.SESSION_NAME]

      if (token) {
        const verified = await this.jwtService.verifyToken(token);
        const {sid, user_id, refreshed_times, iat} = verified
        const session = await this.authService.verifySession(sid, user_id)
        const refreshed = refreshed_times + 1

        if (this.isTokenAfterNMin(iat) && this.isTooManyRefreshed(session, verified)) {
          throw new Error("Token was invalidated")
        }

        res._session = session
        res._token = this.jwtService.createToken(sid, user_id, refreshed)

        /** @Async <Never await this method> */
        this.authService.updateSession(verified)
      } else {
        res._session = null
      }
      next()
    }
  }

  isTokenAfterNMin(iat) {
    const before = Date.now() - ENV.SESSION_SHORT
    const val = (new Date(iat * 1000)).valueOf()

    return val < before
  }

  isTooManyRefreshed(session, verified) {
    return session.refreshed_times - ENV.SESSION_SHORT_REFRESH_LIMIT >= verified.refreshed_times
  }
}
