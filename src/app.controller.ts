import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

const apiUrl = 'https://api.kraken.com/0/public/Ticker';

class RatesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  assets: string[];
}

@Controller()
export class AppController {
  constructor(private httpService: HttpService) {}

  @Post('assets')
  async getRates(@Body() body: RatesDto): Promise<{ [key: string]: number }> {
    try {
      const { assets } = body;
      const response = await this.httpService
        .get(`${apiUrl}?pair=${assets.join(',')}`)
        .pipe(map((res) => res.data))
        .toPromise();
      const data = {};
      for (const pairKey of Object.keys(response.result)) {
        const pairData = response.result[pairKey];
        const exchangeRate = pairData.c[0];
        data[pairKey] = exchangeRate;
      }
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Something went wrong',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
