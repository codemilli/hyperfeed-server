import {Middleware} from "@nestjs/common";
import {ExpressMiddleware, NestMiddleware} from "@nestjs/common/interfaces/middlewares";
import {JWTService} from "../../auth/jwt/jwt.service";
import {AuthService} from "../../auth/auth.service";
import {IAuthToken} from "../../auth/jwt/token.type";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly authService: AuthService) {}

  resolve(...args: any[]): ExpressMiddleware {
    return async (req, res, next) => {
      const token = req.headers['authorization']

      if (token) {
        let verified: IAuthToken;

        try {
          verified = await this.jwtService.verifyToken(token)
        } catch(e) {
          throw e
        }

        req._session = verified
        this.authService.updateSession(verified)
      } else {
        req._session = null
      }
      next()
    }
  }
}
