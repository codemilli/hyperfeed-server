import {Interceptor} from "@nestjs/common";
import {NestInterceptor} from "@nestjs/common/interfaces/nest-interceptor.interface";
import {ExecutionContext} from "@nestjs/common/interfaces/execution-context.interface";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {ENV} from "../../../../config/env/development";

@Interceptor()
export class ResponseMapperInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map((data) => {
      const res = dataOrRequest.res

      if (res._token) {
        res.cookie(ENV.SESSION_NAME, res._token, {
          httpOnly: true,
          maxAge: ENV.SESSION_LONG,
          domain: ENV.SESSION_DOMAIN
        })
      }

      return {
        status: res.statusCode,
        message: res._message || 'ok',
        used_token: dataOrRequest.headers[ENV.SESSION_NAME],
        next_token: res._token,
        data: data
      }
    })
  }
}
