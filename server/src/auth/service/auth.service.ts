import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { config } from 'dotenv'

import { UserService } from 'src/services/user/user.service'
import { compareHashedData } from 'src/utils/helper'
import { Tokens } from 'src/utils/types'
import { LoginDto, SignUpDto } from './../dto/auth.dto'
import { UserDto } from 'src/DTOs/user.dto'
import { UserSchema } from 'src/schemas/user.schema'

config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string

@Injectable()
export class AuthService {
  jwtOptions: {
    secret: string
    verify: { algorithms: string[] }
  }
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.jwtOptions = {
      secret: ACCESS_TOKEN_SECRET,
      verify: { algorithms: ['HS256'] },
    }
  }

  /**
   * Authenticates a user by checking if the provided email and password match.
   * If successful, generates JWT tokens and returns them.
   *
   * @param {LoginDto} loginDto - The login data containing the email and password.
   * @return {Promise<Tokens | null>} A promise that resolves to the JWT tokens if successful, or null if the user is not found or the password is incorrect.
   */
  async login(loginDto: LoginDto): Promise<Tokens | null> {
    const user = await this.userService.findOneByEmail(loginDto.email)
      .then(user => user["_doc"])
    if (!user) return null

    const isPasswordMatchs = await compareHashedData(
      loginDto.password,
      user.password
    )
    if (!isPasswordMatchs) return null

    // Set the refresh token to null before generating new tokens
    user.refresh_token = null

    // Generate new JWT tokens
    const tokens = await this.getTokens(user)

    // Update the refresh token in the database
    await this.userService.updateRefreshToken(user._id, tokens.refresh_token)

    // Return the generated tokens
    return tokens
  }

  /**
   * Sign up a new user.
   *
   * @param {SignUpDto} signupDto - The sign up data containing the user's information.
   * @return {Promise<Tokens>} A promise that resolves to the JWT tokens if successful.
   * @throws {Error} If there is an error during the sign up process.
   */
  async signUp(signupDto: SignUpDto): Promise<Tokens> {
    try {
      const user = await this.userService.create(signupDto)
        .then(user => user['_doc'])

      // Generate JWT tokens for the newly created user
      const tokens = await this.getTokens(user)

      // Update the refresh token in the database for the newly created user
      await this.userService.updateRefreshToken(user._id, tokens.refresh_token)

      return tokens
    } catch (err) {
      // Wrap the error in a new Error object and throw it
      throw new Error(err)
    }
  }

  /**
   * Updates the refresh token for a user.
   *
   * @param {string} id - The ID of the user.
   * @param {string} refresh_token - The new refresh token.
   * @return {Promise<any>} A promise that resolves to the updated tokens.
   * @throws {UnauthorizedException} If the user is not authorized.
   */
  async updateRefreshToken(id: string, refresh_token: string): Promise<any> {
    const user = await this.userService.findOneById(id)
      .then(user => user['_doc'])

    // If the user does not exist, throw an UnauthorizedException
    if (!user) throw new UnauthorizedException('User is not authorized')

    // Decode the refresh token to get the payload
    const verifiesUser = await this.jwtService.decode(refresh_token)
    const payload = verifiesUser.payload

    console.log(payload)

    // Set the refresh token in the payload to null befoer generating new one
    payload.refresh_token = null

    // Generate new JWT tokens with the updated payload
    const tokens = await this.getTokens(payload)

    // Update the refresh token in the database with the new token
    await this.userService.updateRefreshToken(payload._id, tokens.refresh_token)

    // Return the updated tokens
    return tokens
  }

  /**
   * Logs out a user by updating the refresh token to null in the database.
   *
   * @param {string} id - The ID of the user to log out.
   * @return {Promise<string>} A promise that resolves to a string indicating the success of the logout operation.
   */
  async logout(id: string): Promise<string> {
    await this.userService.updateRefreshToken(id, null)
    return 'Logged out successfully'
  }

  /**
   * Decodes a JWT token and returns its payload.
   *
   * @param {string} token - The JWT token to decode.
   * @return {Promise<any>} A promise that resolves to the decoded token's payload.
   */
  async decodeToken(token: string): Promise<any> {
    // Decode the JWT token and return its payload.
    // The `jwtService.decode()` method is asynchronous and returns a promise,
    // so we use `await` to wait for the promise to resolve and return the result.
    return await this.jwtService.decode(token)
  }

  /**
   * Generates JWT access and refresh tokens for the provided user schema or DTO.
   *
   * @param {UserSchema | UserDto} user - The user schema or DTO for which to generate tokens.
   * @return {Promise<Tokens>} A promise that resolves to an object containing the access and refresh tokens.
   */
  private async getTokens(user: UserSchema | UserDto): Promise<Tokens> {
    // Generate the access token asynchronously
    const accessTokenPromise = this.jwtService.signAsync(
      user,
      {
        expiresIn: '1h',
        secret: ACCESS_TOKEN_SECRET,
      },
    )

    // Generate the refresh token asynchronously
    const refreshTokenPromise = this.jwtService.signAsync(
      user,
      {
        expiresIn: '1h',
        secret: REFRESH_TOKEN_SECRET,
      },
    )

    // Generate both tokens concurrently
    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise
    ])

    return { access_token: accessToken, refresh_token: refreshToken }
  }
}
