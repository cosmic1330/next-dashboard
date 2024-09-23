import { StockData, TaxieData } from '../../types';
import { MaType } from './types';

export default function isMutiConsecutiveDaysAboveMovingAverage(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
  type: MaType = MaType.MA5,
  days: number = 3,
) {
  let length = datas.length - 1;

  const indices = Array.from(
    { length: days },
    (_, i) => length - rollback_date - i,
  ).reverse();

  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }

  const check = indices.every(
    (index) => datas[index].c > <number>datas[index][type],
  );

  if (check) return true;
  return false;
}
