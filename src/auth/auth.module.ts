import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { TokensService } from './tokens/tokens.service';
import { UsersService } from '../users/users.service';
import { Token } from './tokens/tokens.model';
import { User } from '../users/users.model';
import { RolesModule } from '../roles/roles.module';
import { AccountsModule } from '../accounts/accounts.module';
import { MailModule } from '../mail/mail.module';
import { RolesGuard } from './guards/role-auth.guard';
import { AccountGuard } from './guards/account-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokensService,
    JwtService,
    UsersService,
    RolesGuard,
    AccountGuard,
  ],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET || 'access_token_secret',
      signOptions: {
        expiresIn: '30m',
      },
    }),
    MailModule,
    RolesModule,
    AccountsModule,
    TokensModule,
    SequelizeModule.forFeature([Token, User]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
