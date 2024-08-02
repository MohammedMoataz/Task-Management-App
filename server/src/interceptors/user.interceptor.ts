import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { map, Observable } from 'rxjs'

import { CreateUserDto } from 'src/DTOs/user.dto'

@Injectable()
export class CreateUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()
    const user = plainToClass(CreateUserDto, req.body)
    console.log({ user })

    return next.handle()
  }
}
