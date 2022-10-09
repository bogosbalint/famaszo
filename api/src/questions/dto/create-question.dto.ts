import { IUser } from "src/user/user.interface";

export class CreateQuestionDTO {
    question: string;
    answer: string;
    user_id: string;
}