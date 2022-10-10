import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    getUser(@Param(':id') id: string): Promise<IUser | null> {
        return this.userService.findById(id);
    }

    @Get()
    getAllUser(): Promise<UserDocument[]> {
        return this.userService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('username') username: string): Promise<UserDocument> {
        return this.userService.update(id, username);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
