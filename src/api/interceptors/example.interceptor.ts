import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable()
export class ExampleInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const apiResponseHandler = null; // get your apiResponseHandler
    return next
      .handle()
      .pipe(
        map((response) => apiResponseHandler.get({ data: response || null }))
      );
  }
}
