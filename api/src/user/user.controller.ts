import { Controller, Get, Param } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    /*@Get(':id')
    getUser(@Param(':id') id: string): Promise<IUser | null> {
        return this.userService.findById(id);
    }*/

}
