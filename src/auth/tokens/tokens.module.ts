import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { TokensService } from './tokens.service';
import { User } from '../../users/users.model';
import { Token } from './tokens.model';

@Module({
  providers: [TokensService, JwtService],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forFeature([Token, User]),
  ],
  exports: [TokensService],
})
export class TokensModule {}
