import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScoreDTO } from './dto/new-score.dto';
import { ScoreDocument } from './score.schema';

@Injectable()
export class ScoreService {
    constructor(@InjectModel('Score') private readonly scoreModel: Model<ScoreDocument>) {}

    async create(createScore: CreateScoreDTO): Promise<ScoreDocument> {
        const {value, username, time} = createScore;

        const newScore = new this.scoreModel({value, username, time});

        return newScore.save();
    }

    async findAll(): Promise<ScoreDocument[]> {
        return this.scoreModel.find().exec();
    }

    async findById(id: string): Promise<ScoreDocument> {
        return this.scoreModel.findById(id).exec();
    }

    async update(id: string, username: string): Promise<ScoreDocument> {
        let existingScore = await this.scoreModel.findById(id).exec();

        console.log(existingScore);

        existingScore.username = username ?? existingScore.username;

        return existingScore.save();
    }

    async delete(id: string) {
        return this.scoreModel.deleteOne({_id: id}).exec();
    }
}
