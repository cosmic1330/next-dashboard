import { slope } from '@ch20026103/anysis';
import { StockData, TaxieData } from '../../types';

export default function isMovingAveragesConverging(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
  days: number = 20,
  threshold: number = 0.2,
) {
  let length = datas.length - 1;
  const indices = Array.from(
    { length: days },
    (_, i) => length - rollback_date - i,
  ).reverse();

  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }

  const ma5 = slope(indices.map((index) => <number>datas[index].ma5));
  const ma10 = slope(indices.map((index) => <number>datas[index].ma10));
  const ma20 = slope(indices.map((index) => <number>datas[index].ma20));

  if (
    ma5 < threshold &&
    ma10 < threshold &&
    ma20 < threshold &&
    ma5 > 0 &&
    ma10 > 0 &&
    ma20 > 0
  )
    return true;
}
