import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ScoreDocument = Score & Document;

@Schema()
export class Score {
    @Prop({required: true})
    value: number;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    time: string;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);