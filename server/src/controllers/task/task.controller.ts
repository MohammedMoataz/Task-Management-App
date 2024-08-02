import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Request } from 'express'

import { CreateTaskDto, TaskDto, UpdateTaskDto } from 'src/DTOs/task.dto'
import { TaskSchema } from 'src/schemas/task.schema'
import { TaskService } from 'src/services/task/task.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { plainToClass } from 'class-transformer'

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get('all')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async getTasks(@Req() req: Request): Promise<TaskSchema[]> {
    const user = req.user["payload"]
    return this.taskService.findAll(user["_id"])
  }

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async getTask(@Query('id') id: string): Promise<TaskDto> {
    const task = this.taskService.findOneById(id)

    if (task) return task
    else throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createTask(@Req() req: Request): Promise<TaskSchema> {
    const newTask = plainToClass(CreateTaskDto, req.body)
    console.log(newTask)

    const user = req.user["payload"]

    return this.taskService.create(newTask, user["_id"])
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Query('id') id: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Promise<string> {
    return this.taskService
      .update(id, updatedTask)
      .then(() => {
        return { message: 'Task updated successfully' }
      })
      .catch((err) => err.message)
  }

  @Delete()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async removeTask(@Query('id') id: string): Promise<any> {
    return this.taskService
      .remove(id)
      .then(() => {
        return { message: 'Task deleted successfully' }
      })
      .catch((err) => err.message)
  }
}
