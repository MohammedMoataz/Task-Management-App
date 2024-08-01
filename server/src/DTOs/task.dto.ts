import { Exclude } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class TaskDto {
  constructor(partial: TaskDto) {
    Object.assign(this, partial)
  }

  _id: string
  title: string
  description: string
  category: 'Work' | 'Personal' | 'Shopping'
  completed: string
  due_date: string
  owner: string
  createdAt: Date
  updatedAt: Date
}

export class CreateTaskDto {
  constructor(partial: CreateTaskDto) {
    Object.assign(this, partial)
  }

  @Exclude()
  _id: string
  @IsNotEmpty()
  title: string
  @IsNotEmpty()
  description: string
  @IsNotEmpty()
  category: 'Work' | 'Personal' | 'Shopping'
  completed: string
  @IsNotEmpty()
  due_date: string
  @IsNotEmpty()
  owner: string
  createdAt: Date
}

export class UpdateTaskDto {
  title: string
  description: string
  category: 'Work' | 'Personal' | 'Shopping'
  completed: string
  due_date: string
  owner: string
  updatedAt: Date
}
