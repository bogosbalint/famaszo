import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dto/existing-user.dto';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { IUser } from 'src/user/user.interface';
import { UserDocument } from 'src/user/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtGuard } from './guards/jwt.guard';

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

    @UseGuards(JwtGuard)
    @Get("profile")
    profile(@CurrentUser('email') email: string): Promise<UserDocument> {
        return this.authService.findByEmail(email);
    }
}
