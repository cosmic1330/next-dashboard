import { BaseStockData, StockData } from '../../types';
import BollGenerate from './classes/boll';
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

type ClassKey =
  | typeof BollGenerate
  | typeof Ma5Generate
  | typeof Ma10Generate
  | typeof Ma20Generate
  | typeof Ma60Generate
  | typeof Ma120Generate
  | typeof Ma240Generate
  | typeof MacdGenerate
  | typeof Obv5Generate
  | typeof Obv10Generate
  | typeof KdGenerate;

export default function createSelectedIndicators(
  classes: ClassKey[],
  data: BaseStockData[],
): StockData[] {
  const finallyData: StockData[] = [...data];
  const generates = classes.map((key: ClassKey) => {
    const instance = new key();
    return instance;
  });
  data.forEach((value, index) => {
    generates.forEach((generate) => {
      const result = generate.generate(value);
      finallyData[index] = {
        ...finallyData[index],
        ...result,
      };
    });
    return;
  });
  return finallyData;
}
