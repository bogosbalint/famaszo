import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { IUser } from 'src/user/user.interface';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async register(user: Readonly<NewUserDTO>): Promise<IUser | any> {
        const {username, email, password} = user;

        const existingUsername = await this.userService.findByUsername(username);

        if(existingUsername) return 'This username has taken';

        const existingEmail = await this.userService.findByEmail(email);

        if(existingEmail) return 'This email has taken';
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const roles = ['user'];

        const newUser = await this.userService.create(username, email, hashedPassword, roles);

        return this.userService.getUserDetails(newUser);
    }

    async verify(email: string, password: string): Promise<IUser | null> {
        const user = await this.userService.findByEmail(email);
        
        if(!user) return null;

        const doesPasswordsMatch = await bcrypt.compare(password, user.password);

        if(!doesPasswordsMatch) return null;

        return this.userService.getUserDetails(user);
    }

    async login(existingUser: ExistingUserDTO): Promise<{token: string} | null> {
        const {email, password} = existingUser;
        const user = await this.verify(email, password);

        if(!user) return null;

        console.log(user);

        const jwt = await this.jwtService.signAsync({ user });

        return {token: jwt};
    }

    async profile(email: string): Promise<UserDocument | null> {
        return this.userService.findByEmail(email);
    }

    async updateProfile(id: string, data: UpdateUserDTO): Promise<UserDocument> {
        return this.userService.update(id, data);
    }
}
