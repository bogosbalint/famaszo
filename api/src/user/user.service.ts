import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    getUserDetails(user: UserDocument): IUser {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await this.userModel.findById(id).exec();
        if(!user) return null;
        return this.getUserDetails(user);
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async isTheUserExists(id: string): Promise<boolean> {
        const user = await this.userModel.findById(id).exec();
        if(!user) return false;
        return true;
    }

    async create(username: string, email: string, password: string, roles: string[]): Promise<UserDocument> {
        const newUser = new this.userModel({username, email, password, roles});

        return newUser.save();
    }

    async update(id: string, username: string): Promise<UserDocument> {
        let existingUser = await this.userModel.findById(id).exec();

        existingUser.username = username ?? existingUser.username;
    
        return existingUser.save();
    }

    async delete(id: string) {
        return this.userModel.deleteOne({ _id: id }).exec();
    }
}
