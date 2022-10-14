import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/roles/roles.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);