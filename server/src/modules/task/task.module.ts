import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Task } from 'src/schemas/task.schema'
import { TaskService } from 'src/services/task/task.service'
import { TaskController } from 'src/controllers/task/task.controller'
import { UserModule } from '../user/user.module'
// import { AuthModule } from 'src/auth/module/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: Task, collection: 'task' },
    ]),
    UserModule,
    // AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
