import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { UpdateQuestionDTO } from './dto/update-question.dto';
import { QuestionDocument } from './question.schema';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectModel('Question') private readonly questionModel: Model<QuestionDocument>,
        private readonly userService: UserService
    ) {}

    async create(user_id: string, createQuestion: CreateQuestionDTO): Promise<QuestionDocument> {
        const {question, answer} = createQuestion;

        const bool = await this.userService.isTheUserExists(user_id);
        
        if(!bool) throw new Error('This user does not exists');
        
        const newQuestion = new this.questionModel({ question, answer, user_id });

        return newQuestion.save();
    }

    async findAll(): Promise<QuestionDocument[]> {
        return this.questionModel.find().exec();
    }

    async findById(id: string): Promise<QuestionDocument> {
        return this.questionModel.findById(id).exec();
    }

    async update(id: string, updateQuestion: UpdateQuestionDTO): Promise<QuestionDocument> {
        const {question, answer} = updateQuestion;
        let existingQuestion = await this.findById(id);

        if(!existingQuestion) throw new Error('This question do not exists');

        existingQuestion.question = question ?? existingQuestion.question;
        existingQuestion.answer = answer ?? existingQuestion.answer;
        
        return existingQuestion.save();
    }

    async updateOwn(user_id: string, id: string, updateQuestion: UpdateQuestionDTO): Promise<QuestionDocument> {
        
        const { question, answer } = updateQuestion;
        console.log(question);
        let existingQuestion = await this.findById(id);

        if(!existingQuestion) 
            throw new Error('This question do not exists');
        if(existingQuestion.user_id !== user_id) 
            throw new Error('You do not have the permission to update this question');

        existingQuestion.question = question ?? existingQuestion.question;
        existingQuestion.answer = answer ?? existingQuestion.answer;

        return existingQuestion.save();
    }

    async delete(id: string) {
        return this.questionModel.deleteOne({ _id: id }).exec();
    }

    //async deleteOwn()
}
