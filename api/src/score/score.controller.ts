import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
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

    @Roles('user', 'admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get(':id')
    getScore(@Param('id') id: string): Promise<ScoreDocument> {
        console.log(id)
        return this.scoreService.findById(id);
    }

    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body('username') username: string): Promise<ScoreDocument> {
        return this.scoreService.update(id, username);
    }

    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Delete(':id')
    deleteScore(@Param('id') id: string) {
        return this.scoreService.delete(id);
    }
}
