import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUser } from './user.interface';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/roles.enum';

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

    async findByUsername(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({username}).exec();
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

    async update(id: string, data: UpdateUserDTO): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();

        if(!user) throw new Error('User not found');
        if(!(await bcrypt.compare(data.password, user.password))) 
            throw new Error('Current password is incorrect');

        if(data.newPassword && data.newPassword !== data.newPasswordConfirm)
            throw new Error('New password do not mach');

        if(data.newPassword) user.password = await bcrypt.hash(data.newPassword, 12);


        if(data.username && await this.findByUsername(data.username))
            throw new Error('This username has taken');

        if(data.username) user.username = data.username;

        return user.save();
    }

    async updateRole(id: string, roles: Role[]): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();

        if(!user) throw new Error('User not found');
        if(roles) user.roles = roles;

        return user.save();
    }

    async delete(id: string) {
        return this.userModel.deleteOne({ _id: id }).exec();
    }
}
