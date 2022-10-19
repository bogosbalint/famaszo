import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { IUser } from 'src/user/user.interface';
import { UserDocument } from 'src/user/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { RoleGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<IUser | any> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDTO): Promise<{token: string} | any> {
        return this.authService.login(user);
    }

    @Roles('user', 'admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get("profile")
    profile(@CurrentUser('email') email: string): Promise<UserDocument> {
        return this.authService.profile(email);
    }

    @Roles('user', 'admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Patch()
    update(@CurrentUser('id') id: string, @Body('username') username: string): Promise<UserDocument> {
        return this.authService.update(id, username);
    }
}
