import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

import { Token } from './tokens.model';
import { User } from '../../users/users.model';
import { Role } from '../../roles/roles.model';
import { Account } from '../../accounts/accounts.model';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token) private tokensModel: typeof Token,
  ) {}

  generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map((role: Role) => role.value),
      accounts: user.accounts.map((account: Account) => account.value),
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET as string,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET as string,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateRefreshToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (e) {
      return null;
    }
  }

  async saveToken(token, userId: string): Promise<Token> {
    const tokenData = await this.tokensModel.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = token;
      return tokenData.save();
    }
    return this.tokensModel.create({
      refreshToken: token,
      userId: userId,
    });
  }

  async removeToken(refreshToken: string) {
    return this.tokensModel.destroy({ where: { refreshToken: refreshToken } });
  }
  async findToken(refreshToken: string) {
    return this.tokensModel.findOne({ where: { refreshToken: refreshToken } });
  }
}
