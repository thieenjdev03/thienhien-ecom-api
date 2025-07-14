import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseDto } from '../dto/base-response.dto';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, BaseResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponseDto<T>> {
    const response = context.switchToHttp().getResponse() as any;
    const statusCode: number = response?.statusCode || 200;

    return next.handle().pipe(
      map((data: any): BaseResponseDto<T> => {
        // Nếu data đã là BaseResponseDto thì return luôn
        if (this.isBaseResponse(data)) {
          return data;
        }

        // Nếu data có message riêng (từ buildResponse)
        if (this.isBuildResponseData(data)) {
          return new BaseResponseDto<T>(
            data.responseData,
            data.message,
            statusCode,
          );
        }

        // Mặc định wrap data thông thường
        return new BaseResponseDto<T>(data, undefined, statusCode);
      }),
    );
  }

  private isBaseResponse(data: any): data is BaseResponseDto<T> {
    return (
      data &&
      typeof data === 'object' &&
      'success' in data &&
      'statusCode' in data &&
      'message' in data
    );
  }

  private isBuildResponseData(
    data: any,
  ): data is { responseData: T; message: string } {
    return (
      data &&
      typeof data === 'object' &&
      'message' in data &&
      'responseData' in data
    );
  }
}
