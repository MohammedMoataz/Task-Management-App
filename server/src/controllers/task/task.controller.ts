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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTaskDto, TaskDto, UpdateTaskDto } from 'src/DTOs/task.dto';
import { TaskService } from 'src/services/task/task.service';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  @UsePipes(ValidationPipe)
  async getTasks(): Promise<TaskDto[]> {
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
  async createTask(@Body() newTask: CreateTaskDto): Promise<TaskDto> {
    return this.taskService.create(newTask);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateTask(
    @Query('id') id: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Promise<any> {
    return this.taskService
      .update(id, updatedTask)
      .then(() => 'Task updated successfully')
      .catch((err) => err.message);
  }

  @Delete()
  @UsePipes(ValidationPipe)
  async removeTask(@Query('id') id: string): Promise<any> {
    return this.taskService
      .remove(id)
      .then(() => 'Task deleted successfully')
      .catch((err) => err.message);
  }
}
