import { Model, Types } from 'mongoose'
import { Injectable, Dependencies, NotFoundException } from '@nestjs/common'
import { getModelToken, InjectModel } from '@nestjs/mongoose'
import { plainToClass } from 'class-transformer'

import { TaskSchema } from 'src/schemas/task.schema'
import { TaskDto, CreateTaskDto, UpdateTaskDto } from 'src/DTOs/task.dto'

@Injectable()
@Dependencies(getModelToken('Task'))
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskSchema>,
  ) { }

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskSchema> {
    console.log({ userId })
    createTaskDto.owner = userId
    const createdTask = new this.taskModel(
      plainToClass(CreateTaskDto, createTaskDto),
    )
    console.log({ createdTask })

    const newTask = await createdTask.save()
    console.log({ newTask })

    return newTask
  }

  async findAll(userId: string): Promise<TaskSchema[]> {
    const tasks = await this.taskModel.find({ owner: userId }).exec()
    if (!tasks || tasks.length === 0) throw new NotFoundException('Tasks not found')

    console.log({ tasks })
    return tasks
  }

  async findOneById(id: string): Promise<TaskDto> {
    const task = await this.taskModel.findById(id).exec()
    if (!task) throw new Error('Task not found')

    return plainToClass(TaskDto, task)
  }

  async update(id: string, updatedTask: UpdateTaskDto): Promise<string> {
    const task = await this.taskModel.findById(new Types.ObjectId(id)).exec()
    if (!task) throw new Error('Task not found')
    updatedTask.updatedAt = new Date()

    const result = await this.taskModel
      .updateOne({ _id: id }, updatedTask)
      .exec()
    if (!result) throw new Error('Failed Operation, Try again later!')

    return 'Task was updated successfully'
  }

  async remove(id: string): Promise<string> {
    const result = await this.taskModel.deleteOne({ _id: id }).exec()
    if (!result) throw new Error('Task not found')

    return 'Task was deleted successfully'
  }
}
