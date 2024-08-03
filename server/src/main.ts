import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { config } from 'dotenv'

import { AppModule } from './app.module'

config()
const PORT = process.env.PORT as string

/**
 * This function is the entry point of the NestJS application. It creates a new NestJS application
 * using the AppModule and configures it with global pipes and middleware. It then starts the server
 * to listen on the specified port.
 *
 * @return {Promise<void>} This function does not return anything.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  // Enable CORS to allow requests from different origins
  app.enableCors()

  // Use the helmet middleware to protect against some well-known web vulnerabilities
  app.use(helmet())

  // Start the server and listen on the specified port
  await app.listen(PORT)
}

bootstrap()
