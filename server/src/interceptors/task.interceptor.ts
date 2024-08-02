import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Observable } from 'rxjs'

import { CreateTaskDto } from 'src/DTOs/task.dto'

@Injectable()
export class CreateTaskInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()
    const user = req.user
    console.log({ user })

    return next.handle()
  }
}
