import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

import { UserDto } from 'src/DTOs/user.dto';

@Injectable()
export class CreateUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // return next.handle().pipe(map(user => plainToClass(UserDto, user)))
    return next.handle();
  }
}
