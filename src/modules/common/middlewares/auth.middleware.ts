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
      const token = req.headers['hf-token']

      if (token) {
        const verified = await this.jwtService.verifyToken(token);
        const {sid, user_id, refreshed_times, iat} = verified
        const session = await this.authService.verifySession(sid, user_id)

        if (this.isTokenAfterNMin(iat) && this.isTooManyRefreshed(session, verified)) {
          throw new Error("Token was invalidated")
        }

        req._session = session
        req._token = this.jwtService.createToken(sid, user_id, refreshed_times + 1)

        /** @Async <Never await this method> */
        this.authService.updateSession(verified)
      } else {
        req._session = null
      }
      next()
    }
  }

  isTokenAfterNMin(iat) {
    const before = Date.now() - ENV.SESSION_SHORT
    const val = (new Date(iat)).valueOf()

    return val < before
  }

  isTooManyRefreshed(session, verified) {
    return session.refresh_times - ENV.SESSION_SHORT_REFRESH_LIMIT >= verified.refresh_times
  }
}
