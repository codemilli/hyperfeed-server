import {Interceptor} from "@nestjs/common";
import {NestInterceptor} from "@nestjs/common/interfaces/nest-interceptor.interface";
import {ExecutionContext} from "@nestjs/common/interfaces/execution-context.interface";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Interceptor()
export class ResponseMapperInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map((data) => {
      const res = dataOrRequest.res

      return {
        status: res.statusCode,
        message: res._message || 'ok',
        used_token: dataOrRequest.headers['hf-token'],
        next_token: res._token,
        data: data
      }
    })
  }
}
