import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KrakenService } from './kraken.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BalanceService {
  constructor(
    private readonly krakenService: KrakenService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async calculateBalances() {
    // Get all accounts with their wallets
    const accounts = await this.prisma.account.findMany({
      include: { wallets: true },
    });

    for (const account of accounts) {
      // Get wallets of all accounts
      for (const wallet of account.wallets) {
        let exchangeRate;
        try {
          // Get the exchange rate of the crypto asset in the reference currency
          exchangeRate = await this.krakenService.getExchangeRates(
            wallet.crypto_asset,
            wallet.reference_currency,
          );
        } catch (error) {
          // If getting the exchange rate fails, log the error and move on to the next wallet
          console.log(
            `Error getting exchange rate for ${wallet.crypto_asset}/${wallet.reference_currency}: ${error.message}`,
          );
          continue;
        }
        // Calculate the balance in the reference currency
        const referenceBalance = exchangeRate * wallet.crypto_balance;

        // Save the balance with the date and the associated wallet
        await this.prisma.balance.create({
          data: {
            date: new Date(),
            balance: referenceBalance,
            wallet: {
              connect: { id: wallet.id },
            },
          },
        });
        console.log(
          `Calculated balance ${referenceBalance} for wallet ${wallet.id}`,
        );
      }
    }
  }
}
