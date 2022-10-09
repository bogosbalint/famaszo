import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { QuestionSchema } from './question.schema';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    UserModule, 
    MongooseModule.forFeature([{name: 'Question', schema: QuestionSchema}])
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
