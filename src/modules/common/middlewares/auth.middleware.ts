import {Middleware} from "@nestjs/common";
import {ExpressMiddleware, NestMiddleware} from "@nestjs/common/interfaces/middlewares";
import {ENV} from "../../../../config/env/development";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const session = req.cookies[ENV.SESSION_NAME]

      console.log('session', session)

      next()
    }
  }
}
