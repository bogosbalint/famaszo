import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/famaszo'),
    UserModule,
    AuthModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
