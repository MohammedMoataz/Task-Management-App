import { Model } from 'mongoose'
import { Injectable, Dependencies } from '@nestjs/common'
import { getModelToken, InjectModel } from '@nestjs/mongoose'
import { plainToClass } from 'class-transformer'

import { UserSchema } from 'src/schemas/user.schema'
import { UserDto, CreateUserDto, UpdateUserDto } from 'src/DTOs/user.dto'
import { hashData } from 'src/utils/helper'

@Injectable()
@Dependencies(getModelToken('User'))
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
  ) { }

  /**
   * Create a new user in the database.
   *
   * @param {CreateUserDto} createUserDto - The user data to create.
   * @return {Promise<UserDto>} The created user in DTO format.
   * @throws {Error} If the user already exists in the database.
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    // Check if the user already exists in the database
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec()
    if (user) throw new Error('User already exists')

    // Hash the user's password
    createUserDto.password = await hashData(createUserDto.password)

    // Create a new user in the database
    const createdUser = new this.userModel(createUserDto)
    const newUser = await createdUser.save()

    // Return the created user in DTO format
    return plainToClass(UserDto, newUser)
  }

  /**
   * Retrieves all users from the database.
   *
   * @return {Promise<UserDto[]>} An array of UserDto objects representing all users.
   * @throws {Error} If no users are found in the database.
   */
  async findAll(): Promise<UserDto[]> {
    // Retrieve all users from the database
    const users = await this.userModel.find().exec()
    if (!users || users.length === 0) throw new Error('User not found')

    // Map each user to a UserDto object and return the resulting array
    return users.map((user) => plainToClass(UserDto, user))
  }

  /**
   * Retrieves a user from the database based on their ID.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @return {Promise<UserDto>} The user object found in the database.
   * @throws {Error} If no user is found with the given ID.
   */
  async findOneById(id: string): Promise<UserDto> {
    // Retrieve the user from the database by their ID
    const user = await this.userModel.findById(id).exec()
    if (!user) throw new Error('User not found')

    // Return the user object in DTO format
    return plainToClass(UserDto, user)
  }

  /**
   * Retrieves a user from the database based on their email.
   *
   * @param {string} email - The email of the user to retrieve.
   * @return {Promise<UserDto>} The user object found in the database.
   * @throws {Error} If no user is found with the given email.
   */
  async findOneByEmail(email: string): Promise<UserDto> {
    // Find the user in the database based on their email
    const user = await this.userModel.findOne({ email }).exec()
    if (!user) throw new Error('User not found')

    // Return the user object in DTO format
    return plainToClass(UserDto, user)
  }

  /**
   * Updates a user in the database with the specified ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updatedUser - The updated user data.
   * @returns {Promise<string>} - A promise that resolves to a success message.
   * @throws {Error} - If the user is not found or the update operation fails.
   */
  async update(id: string, updatedUser: UpdateUserDto): Promise<string> {
    // Find the user in the database based on the provided ID
    const user = await this.userModel.findById(id).exec()
    if (!user) throw new Error('User not found')

    // Update the 'updatedAt' field with the current date and time
    updatedUser.updatedAt = new Date()

    // Update the user in the database with the provided updated user data
    const result = await this.userModel
      .updateOne({ _id: id }, updatedUser)
      .exec()

    // Throw an error if the update operation fails
    if (!result) throw new Error('Failed Operation, Try again later!')

    // Return a success message
    return 'User was updated successfully'
  }

  /**
   * Updates the refresh token for a user.
   *
   * @param {any} id - The ID of the user.
   * @param {string} refresh_token - The new refresh token.
   * @return {Promise<string>} A promise that resolves to a string indicating the success of the update operation.
   * @throws {Error} Throws an error if the user is not found.
   * @throws {Error} Throws an error if the update operation fails.
   */
  async updateRefreshToken(id: any, refresh_token: string): Promise<string> {
    // Find the user in the database based on the provided ID
    const user = await this.userModel.findById(id).exec()
    if (!user) throw new Error('User not found')

    // Update the user's refresh token in the database
    const result = await this.userModel
      .updateOne({ _id: id }, { refresh_token })
      .exec()

    // Throw an error if the update operation fails
    if (!result) throw new Error('Failed Operation, Try again later!')

    // Return a success message
    return 'Refresh token was updated successfully'
  }

  /**
   * Removes a user from the database based on the provided id.
   *
   * @param {string} id - The id of the user to remove.
   * @return {Promise<string>} A promise that resolves to a string indicating the success of the deletion operation.
   * @throws {Error} Throws an error if the user is not found.
   */
  async remove(id: string): Promise<string> {
    // Delete the user from the database using the provided id
    const result = await this.userModel.deleteOne({ _id: id }).exec()

    // If the deletion was unsuccessful, throw an error
    if (!result) throw new Error('User not found')

    // Return a success message indicating the deletion was successful
    return 'User was deleted successfully'
  }
}
