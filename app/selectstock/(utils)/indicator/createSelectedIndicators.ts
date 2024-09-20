import {
  BaseStockData,
  BaseTaxieData,
  StockData,
  TaxieData,
} from '../../types';
import BollGenerate from './classes/boll';
import Ema10Generate from './classes/ema10';
import Ema20Generate from './classes/ema20';
import Ema5Generate from './classes/ema5';
import KdGenerate from './classes/kd';
import Ma10Generate from './classes/ma10';
import Ma120Generate from './classes/ma120';
import Ma20Generate from './classes/ma20';
import Ma240Generate from './classes/ma240';
import Ma5Generate from './classes/ma5';
import Ma60Generate from './classes/ma60';
import MacdGenerate from './classes/macd';
import Obv10Generate from './classes/obv10';
import Obv5Generate from './classes/obv5';
import Williams18Generate from './classes/williams18';
import Williams8Generate from './classes/williams8';
import Rsi5Generate from './classes/rsi5';
import Rsi10Generate from './classes/rsi10';

type ClassKey =
  | typeof BollGenerate
  | typeof Rsi5Generate
  | typeof Rsi10Generate
  | typeof Ema5Generate
  | typeof Ema10Generate
  | typeof Ema20Generate
  | typeof Ma5Generate
  | typeof Ma10Generate
  | typeof Ma20Generate
  | typeof Ma60Generate
  | typeof Ma120Generate
  | typeof Ma240Generate
  | typeof MacdGenerate
  | typeof Obv5Generate
  | typeof Obv10Generate
  | typeof KdGenerate
  | typeof Williams8Generate
  | typeof Williams18Generate;

export default function createSelectedIndicators<
  T extends BaseStockData | BaseTaxieData,
>(
  classes: ClassKey[],
  data: T[],
): T extends BaseStockData ? StockData[] : TaxieData[] {
  const finallyData: (T extends BaseStockData ? StockData : TaxieData)[] = [
    ...data,
  ] as any;

  const generates = classes.map((key: ClassKey) => {
    const instance = new key();
    return instance;
  });
  data.forEach((value, index) => {
    generates.forEach((generate) => {
      const result = generate.generate(value as any);
      finallyData[index] = {
        ...finallyData[index],
        ...result,
      };
    });
    return;
  });
  return finallyData as unknown as T extends BaseStockData
    ? StockData[]
    : TaxieData[];
}
