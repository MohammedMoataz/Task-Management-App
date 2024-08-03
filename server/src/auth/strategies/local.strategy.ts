import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../service/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  /**
   * Validates the user's credentials by calling the AuthService's `login` method.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @throws UnauthorizedException if the user is not found.
   * @returns The user object if the credentials are valid.
   */
  async validate(email: string, password: string) {
    console.log('Inside LocalStrategy')

    // Call the AuthService's login method to validate the user's credentials
    const user = await this.authService.login({ email, password })
    console.log({ user })

    // Throw an UnauthorizedException if the user is not found
    if (!user) throw new UnauthorizedException()

    // Return the user object if the credentials are valid
    return user
  }
}
