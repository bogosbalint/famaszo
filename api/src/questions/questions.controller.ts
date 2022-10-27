import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { QuestionDocument } from './question.schema';
import { UpdateQuestionDTO } from './dto/update-question.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('questions')
export class QuestionsController {

    constructor(private questionService: QuestionsService) {}
    
    //CREATE
    @Roles('user', 'admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Post()
    createQuestion(@CurrentUser('id') id: string, @Body() question: CreateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.create(id, question);
    }

    //BROWSE
    @Roles('user', 'admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get()
    getAllQuestion(): Promise<QuestionDocument[]>  {
        return this.questionService.findAll();
    }
    
    //READ
    @Get(':id')
    getQuestion(@Param('id') id: string): Promise<QuestionDocument> {
        return this.questionService.findById(id);
    }

    //UPDATE
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() question: UpdateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.update(id, question);
    }

    //UPDATE OWN
    @Roles('user', 'admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Patch('updateOwn/:id')
    updateOwn(@Param('id') id: string, @CurrentUser('id') user_id: string, @Body() question: UpdateQuestionDTO): Promise<QuestionDocument> {
        return this.questionService.updateOwn(user_id, id, question);
    }

    //DELETE
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionService.delete(id);
    }
}
