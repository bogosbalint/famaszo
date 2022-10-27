import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { IUser } from './user.interface';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Role } from 'src/roles/roles.enum';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    //BROWSE
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get()
    getAllUser(): Promise<UserDocument[]> {
        return this.userService.findAll();
    }

    //READ
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get(':id')
    getUser(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.findById(id);
    }

    //UPDATE
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateUserDTO): Promise<UserDocument> {
        return this.userService.update(id, data);
    }

    //UPDATE ROLES
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Patch('role/:id')
    updateRole(@Param('id') id: string, @Body('roles') roles: Role[]): Promise<UserDocument> {
        return this.userService.updateRole(id, roles);
    }

    //DELETE
    @Roles('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
