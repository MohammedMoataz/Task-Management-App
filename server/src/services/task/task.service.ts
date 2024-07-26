import { Model } from 'mongoose';
import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';

import { TaskSchema } from 'src/schemas/task.schema';
import { TaskDto, CreateTaskDto, UpdateTaskDto } from 'src/DTOs/task.dto';

@Injectable()
@Dependencies(getModelToken('Task'))
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskSchema>,
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const createdTask = new this.taskModel(createTaskDto);
    const newTask = await createdTask.save();

    return plainToClass(TaskDto, newTask);
  }

  async findAll(): Promise<TaskDto[]> {
    const tasks = await this.taskModel.find().exec();
    if (!tasks || tasks.length === 0) throw new Error('Task not found');

    return tasks.map((task) => plainToClass(TaskDto, task));
  }

  async findOneById(id: string): Promise<TaskDto> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new Error('Task not found');

    return plainToClass(TaskDto, task);
  }

  async update(id: string, updatedTask: UpdateTaskDto): Promise<string> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new Error('Task not found');

    updatedTask.updatedAt = new Date();

    const result = await this.taskModel.updateOne({ id }, updatedTask).exec();
    if (!result) throw new Error('Failed Operation, Try again later!');

    return 'Task was updated successfully';
  }

  async remove(id: string): Promise<string> {
    const result = await this.taskModel.deleteOne({ id }).exec();
    if (!result) throw new Error('Task not found');

    return 'Task was deleted successfully';
  }
}
