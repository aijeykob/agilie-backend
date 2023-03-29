import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface KrakenResponse {
  result: {
    [pair: string]: {
      c: [string];
    };
  };
}

@Injectable()
export class KrakenService {
  constructor(private readonly httpService: HttpService) {}

  async getExchangeRates(
    baseCurrency: string,
    targetCurrency: string,
  ): Promise<number> {
    const pair = `${baseCurrency}/${targetCurrency}`;

    try {
      const response = await this.httpService
        .get(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
        .toPromise();
      const data = response.data as KrakenResponse;
      const exchangeRate = parseFloat(data.result[pair].c[0]);
      return exchangeRate;
    } catch (error) {
      throw error;
    }
  }
}
