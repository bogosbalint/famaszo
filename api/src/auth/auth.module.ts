import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '3600s'},
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy, RoleGuard]
})
export class AuthModule {}
