import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth/service/auth.service';
import { AuthController } from './auth/controller/auth.controller';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/module/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://mohammedmoataz:vbaP2JwBpqAHDKUe@task.1emtbsh.mongodb.net/?retryWrites=true&w=majority&appName=task`,
      { dbName: 'task-management' },
    ),
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
