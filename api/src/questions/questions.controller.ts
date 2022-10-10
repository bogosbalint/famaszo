import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { QuestionDocument } from './question.schema';
import { UpdateQuestionDTO } from './dto/update-question.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('questions')
export class QuestionsController {

    constructor(private questionService: QuestionsService) {}
    
    @UseGuards(JwtGuard)
    @Post()
    createQuestion(@Body() question: CreateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.create(question);
    }

    @UseGuards(JwtGuard)
    @Get()
    getAllQuestion(): Promise<QuestionDocument[]>  {
        return this.questionService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    getQuestion(@Param('id') id: string): Promise<QuestionDocument> {
        return this.questionService.findById(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body('question') question: UpdateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.update(id, question);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionService.delete(id);
    }
}
