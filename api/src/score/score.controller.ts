import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
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
    getAllScore(): Promise<ScoreDocument[]>  {
        return this.scoreService.findAll();
    }

    @Get(':id')
    getScore(@Param('id') id: string): Promise<ScoreDocument> {
        console.log(id)
        return this.scoreService.findById(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body('username') username: string): Promise<ScoreDocument> {
        return this.scoreService.update(id, username);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteScore(@Param('id') id: string) {
        return this.scoreService.delete(id);
    }
}
