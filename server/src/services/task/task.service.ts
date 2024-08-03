import { Model, Types } from 'mongoose'
import {
  Injectable,
  Dependencies,
  NotFoundException
} from '@nestjs/common'
import { getModelToken, InjectModel } from '@nestjs/mongoose'
import { plainToClass } from 'class-transformer'

import { TaskSchema } from 'src/schemas/task.schema'
import {
  TaskDto,
  CreateTaskDto,
  UpdateTaskDto
} from 'src/DTOs/task.dto'

@Injectable()
@Dependencies(getModelToken('Task'))
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskSchema>,

  ) { }

  /**
   * Creates a new task with the provided task details and user ID.
   *
   * @param {CreateTaskDto} createTaskDto - The task details.
   * @param {string} userId - The ID of the user creating the task.
   * @return {Promise<TaskSchema>} The newly created task.
   */
  async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskSchema> {
    console.log({ userId })
    createTaskDto.owner = userId

    // Convert the createTaskDto object to a TaskSchema object using class-transformer
    const createdTask = new this.taskModel(plainToClass(CreateTaskDto, createTaskDto))
    console.log({ createdTask })

    // Save the created task to the database and return it
    const newTask = await createdTask.save()
    console.log({ newTask })

    return newTask
  }

  /**
   * Retrieves all tasks associated with a given user.
   *
   * @param {string} userId - The ID of the user whose tasks are to be retrieved.
   * @return {Promise<TaskSchema[]>} An array of tasks associated with the user.
   * @throws {NotFoundException} If no tasks are found for the user.
   */
  async findAll(userId: string): Promise<TaskSchema[]> {
    const tasks = await this.taskModel.find({ owner: userId }).exec()

    // If no tasks are found, throw a NotFoundException
    if (!tasks || tasks.length === 0) throw new NotFoundException('Tasks not found')

    return tasks
  }

  /**
   * Retrieves a task from the database based on its ID.
   *
   * @param {string} id - The ID of the task to retrieve.
   * @return {Promise<TaskDto>} The task object found in the database.
   * @throws {Error} If no task is found with the given ID.
   */
  async findOneById(id: string): Promise<TaskDto> {
    const task = await this.taskModel.findById(id).exec()

    // If no task is found, throw an error
    if (!task) throw new Error('Task not found')

    // Return the task object in DTO format
    return plainToClass(TaskDto, task)
  }

  /**
   * Updates a task in the database by its ID.
   *
   * @param {string} id - The ID of the task to be updated.
   * @param {UpdateTaskDto} updatedTask - The updated task object.
   * @return {Promise<string>} A promise that resolves to a success message
   * if the task was updated successfully, or rejects with an error if the task
   * was not found.
   */
  async update(id: string, updatedTask: UpdateTaskDto): Promise<string> {
    const task = await this.taskModel.findById(new Types.ObjectId(id)).exec()
    if (!task) throw new Error('Task not found')

    // Update the updatedAt field with the current date and time
    updatedTask.updatedAt = new Date()

    // Update the task in the database
    const result = await this.taskModel
      .updateOne({ _id: id }, updatedTask)
      .exec()
    if (!result) throw new Error('Failed Operation, Try again later!')

    // Return a success message
    return 'Task was updated successfully'
  }

  /**
   * Deletes a task from the database by its ID.
   *
   * @param {string} id - The ID of the task to be deleted.
   * @return {Promise<string>} A promise that resolves to a success message
   * if the task was deleted successfully, or rejects with an error if the task
   * was not found.
   */
  async remove(id: string): Promise<string> {
    const result = await this.taskModel.deleteOne({ _id: id }).exec()

    // If the deletion was not successful (i.e., no task was deleted), throw an error.
    if (!result) throw new Error('Task not found')

    // Return a success message indicating that the task was deleted.
    return 'Task was deleted successfully'
  }
}
