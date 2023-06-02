import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { IStatistic } from './statistic.inteface';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../roles/decorators/role.decorator';
import { Accounts } from '../accounts/decorators/account.decorator';
import { AccountGuard } from '../auth/guards/account-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';

@ApiTags('Staistic')
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @ApiOperation({
    summary: 'Check ads statistic data (only for PREMIUM SELLER)',
  })
  @ApiResponse({ status: 201 })
  @Accounts('PREMIUM')
  @UseGuards(AccountGuard)
  @Get('/:id')
  async getByAdsId(
    @Res() res,
    @Param('id') adsId: string,
  ): Promise<IStatistic> {
    return res
      .status(HttpStatus.OK)
      .json(await this.statisticService.getByAdsId(adsId));
  }
}
