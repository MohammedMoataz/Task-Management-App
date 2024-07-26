import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';
import { UserController } from 'src/controllers/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User, collection: 'user' },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
