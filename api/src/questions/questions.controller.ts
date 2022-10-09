import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { QuestionDocument } from './question.schema';
import { UpdateQuestionDTO } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {

    constructor(private questionService: QuestionsService) {}
    
    @Post()
    createQuestion(@Body() question: CreateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.create(question);
    }

    @Get()
    getAllQuestion(): Promise<QuestionDocument[]>  {
        return this.questionService.findAll();
    }

    @Get(':id')
    getQuestion(@Param('id') id: string): Promise<QuestionDocument> {
        return this.questionService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('question') question: UpdateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.update(id, question);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionService.delete(id);
    }
}
