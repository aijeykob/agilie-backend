import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { BalanceService } from './Accounts/balance.service';
import { KrakenService } from './Accounts/kraken.service';

import { PrismaService } from './prisma.service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [BalanceService, KrakenService, PrismaService],
})
export class AppModule {}
