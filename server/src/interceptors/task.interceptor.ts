import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { map, Observable } from 'rxjs'

import { TaskDto } from 'src/DTOs/task.dto'

@Injectable()
export class CreateTaskInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // return next.handle().pipe(map(task => plainToClass(TaskDto, task)))
    return next.handle()
  }
}
