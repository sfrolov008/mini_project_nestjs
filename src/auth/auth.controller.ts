import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto/auth.dto';
import { User } from '../users/users.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, type: User })
  @Post('registration')
  async registration(
    @Res() res: Response,
    @Body() dto: RegistrationDto,
  ): Promise<Response<User>> {
    const userData = await this.authService.registration(dto);
    if ('refreshToken' in userData) {
      return res
        .cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(HttpStatus.CREATED)
        .json(userData);
    }
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200 })
  @Post('login')
  async login(@Res() res: Response, @Body() loginData: LoginDto) {
    const userData = await this.authService.login(loginData);
    if ('refreshToken' in userData) {
      return res
        .cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(HttpStatus.OK)
        .json(userData);
    }
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200 })
  @Post('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    res
      .clearCookie('refreshToken')
      .status(HttpStatus.OK)
      .json(await this.authService.logout(refreshToken));
  }

  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: any) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    if ('refreshToken' in userData) {
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(HttpStatus.OK).json(userData);
    }
  }
}
