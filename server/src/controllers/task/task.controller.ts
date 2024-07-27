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
  // UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CreateTaskDto, TaskDto, UpdateTaskDto } from 'src/DTOs/task.dto';
import { TaskSchema } from 'src/schemas/task.schema';
import { TaskService } from 'src/services/task/task.service';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  @UsePipes(ValidationPipe)
  // @UseGuards(JwtAuthGuard)
  async getTasks(): Promise<TaskSchema[]> {
    return this.taskService.findAll();
  }

  @Get()
  @UsePipes(ValidationPipe)
  // @UseGuards(JWTAuthGuard)
  async getTask(@Query('id') id: string): Promise<TaskDto> {
    const task = this.taskService.findOneById(id);

    if (task) return task;
    else throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() newTask: CreateTaskDto): Promise<TaskSchema> {
    console.log({ newTask });
    return this.taskService.create(plainToClass(CreateTaskDto, newTask));
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateTask(
    @Query('id') id: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Promise<string> {
    return this.taskService
      .update(id, updatedTask)
      .then(() => {
        return { message: 'Task updated successfully' };
      })
      .catch((err) => err.message);
  }

  @Delete()
  @UsePipes(ValidationPipe)
  async removeTask(@Query('id') id: string): Promise<any> {
    return this.taskService
      .remove(id)
      .then(() => {
        return { message: 'Task deleted successfully' };
      })
      .catch((err) => err.message);
  }
}
