import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { config } from 'dotenv'

import { AppModule } from './app.module'

config()
const PORT = process.env.PORT as string

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.use(helmet())

  await app.listen(PORT)
}

bootstrap()
