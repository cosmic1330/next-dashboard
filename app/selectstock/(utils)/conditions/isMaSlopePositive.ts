import { simpleRegressionModel, slope } from '@ch20026103/anysis';
import { StockData, TaxieData } from '../../types';
import { MaType } from './types';
export default function isMaSlopePositive(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
  ma: MaType,
  threshold = 0,
  days = 3,
) {
  let length = datas.length - 1;
  
  const indices = Array.from(
    { length: days },
    (_, i) => length - rollback_date - i,
  ).reverse();

  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }

  const y = indices.map((index) => datas[index][ma]);

  if (y.some((item) => item === undefined)) {
    return false;
  }

  const x = Array.from({ length: y.length }, (_, index) => index);
  const regression = simpleRegressionModel(x, <number[]>y);
  const new_y = x.map((y) => regression.predictModel(y));
  if (slope(new_y) > threshold) return true;
  return false;
}
