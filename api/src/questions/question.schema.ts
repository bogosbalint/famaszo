import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
    @Prop({required: true})
    question: string;

    @Prop({required: true})
    answer: string;

    @Prop({required: true})
    user_id: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);