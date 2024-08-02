import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  constructor(partial: SignUpDto) {
    Object.assign(this, partial)
  }

  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}

export class SignUpDto {
  constructor(partial: SignUpDto) {
    Object.assign(this, partial)
  }

  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  password: string
  title: string
  about: string
  picture: string
  refresh_token: string
  createdAt: Date
}
