import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User } from 'src/schemas/user.schema'
import { UserService } from 'src/services/user/user.service'
import { UserController } from 'src/controllers/user/user.controller'
import { LinkedInScraperService } from 'src/scraping/linkedin-scraper.service'
// import { AuthModule } from 'src/auth/module/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User, collection: 'user' },
    ]),
    // AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, LinkedInScraperService],
  exports: [UserService],
})
export class UserModule {}
