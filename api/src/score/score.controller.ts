import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateScoreDTO } from './dto/new-score.dto';
import { ScoreDocument } from './score.schema';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {

    constructor(private scoreService: ScoreService) {}

    @Post()
    createScore(@Body() score: CreateScoreDTO): Promise<ScoreDocument> {
        return this.scoreService.create(score);
    }

    @Get()
    getAllQuestion(): Promise<ScoreDocument[]>  {
        return this.scoreService.findAll();
    }

    @Get(':id')
    getQuestion(@Param('id') id: string): Promise<ScoreDocument> {
        return this.scoreService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('username') username: string): Promise<ScoreDocument> {
        return this.scoreService.update(id, username);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.scoreService.delete(id);
    }
}
