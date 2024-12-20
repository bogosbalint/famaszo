import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { ScoreModule } from './score/score.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/guards/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/famaszo'),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    QuestionsModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
