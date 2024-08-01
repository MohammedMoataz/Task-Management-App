import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Exclude } from 'class-transformer'

export class UserDto {
  constructor(partial: UserDto) {
    Object.assign(this, partial)
  }

  id: string
  name: string
  email: string
  @Exclude()
  password: string
  title: string
  address: string
  picture: string
  refresh_token: string
  createdAt: Date
  updatedAt: Date
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  password: string
  title: string
  address: string
  picture: string
  createdAt: Date
}

export class UpdateUserDto {
  name: string
  email: string
  password: string
  title: string
  address: string
  picture: string
  refresh_token: string
  updatedAt: Date
}
