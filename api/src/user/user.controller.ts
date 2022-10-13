import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { IUser } from './user.interface';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get(':id')
    getUser(@Param(':id') id: string): Promise<IUser | null> {
        return this.userService.findById(id);
    }

    //@UseGuards(JwtGuard)
    @Get()
    getAllUser(): Promise<UserDocument[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body('username') username: string): Promise<UserDocument> {
        return this.userService.update(id, username);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
