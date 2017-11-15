import {Middleware} from "@nestjs/common";
import {ExpressMiddleware, NestMiddleware} from "@nestjs/common/interfaces/middlewares";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      console.log('request url: ', req.url)
      next()
    }
  }
}
