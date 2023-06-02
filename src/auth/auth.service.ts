import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto, RegistrationDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { TokensService } from './tokens/tokens.service';
import { MailService } from '../mail/mail.service';
import { MailTemplate } from '../mail/mail.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private mailService: MailService,
  ) {}

  async registration(userData: RegistrationDto) {
    try {
      const findUser = await this.usersService.getByEmail(userData.email);
      if (findUser) {
        throw new HttpException(
          `!User with ${userData.email} already exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(userData.password, 5);
      const user = await this.usersService.create({
        ...userData,
        password: hashPassword,
      });
      if (user) {
        await this.mailService.send(
          user.email,
          'GREETING',
          MailTemplate.GREETING,
          {
            userName: user.name,
          },
        );
        const tokens = this.tokensService.generateTokens(user);
        await this.tokensService.saveToken(tokens.refreshToken, user.id);
        return { ...tokens, user };
      }
    } catch (e) {
      console.log(e);
      return new HttpException(
        '!Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginData: LoginDto) {
    try {
      const findUser = await this.usersService.findByEmail(loginData.email);

      if (!findUser) {
        throw new HttpException(
          `!Incorrect email or password`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPassValid = await bcrypt.compare(
        loginData.password,
        findUser.password,
      );
      if (!isPassValid) {
        throw new HttpException(
          '!Incorrect email or password',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.usersService.getOne(findUser.id);
      const tokens = this.tokensService.generateTokens(user);
      await this.tokensService.saveToken(tokens.refreshToken, user.id);
      return { ...tokens, user };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async logout(refreshToken: string) {
    await this.tokensService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userData = this.tokensService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokensService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.getOne(userData.id);
    const tokens = this.tokensService.generateTokens(user);
    await this.tokensService.saveToken(tokens.refreshToken, user.id);
    return { ...tokens, user };
  }
}
