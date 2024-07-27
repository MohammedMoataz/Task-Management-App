import { Model } from 'mongoose';
import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';

import { UserSchema } from 'src/schemas/user.schema';
import { UserDto, CreateUserDto, UpdateUserDto } from 'src/DTOs/user.dto';
import { hashData } from 'src/utils/helper';

@Injectable()
@Dependencies(getModelToken('User'))
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (user) throw new Error('User already exists');

    createUserDto.password = await hashData(createUserDto.password);
    const createdUser = new this.userModel(createUserDto);
    const newUser = await createdUser.save();

    return plainToClass(UserDto, newUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    if (!users || users.length === 0) throw new Error('User not found');

    return users.map((user) => plainToClass(UserDto, user));
  }

  async findOneById(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new Error('User not found');

    return plainToClass(UserDto, user);
  }

  async findOneByEmail(email: string): Promise<UserSchema> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new Error('User not found');

    return user;
  }

  async update(id: string, updatedUser: UpdateUserDto): Promise<string> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new Error('User not found');

    updatedUser.updatedAt = new Date();

    const result = await this.userModel
      .updateOne({ _id: id }, updatedUser)
      .exec();
    if (!result) throw new Error('Failed Operation, Try again later!');

    return 'User was updated successfully';
  }

  async updateRefreshToken(id: any, refresh_token: string): Promise<string> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new Error('User not found');

    const result = await this.userModel
      .updateOne({ _id: id }, { refresh_token })
      .exec();
    if (!result) throw new Error('Failed Operation, Try again later!');

    return 'Refresh token was updated successfully';
  }

  async remove(id: string): Promise<string> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (!result) throw new Error('User not found');

    return 'User was deleted successfully';
  }
}
