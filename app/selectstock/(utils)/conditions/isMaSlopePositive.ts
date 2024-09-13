import { simpleRegressionModel, slope } from '@ch20026103/anysis';
import { StockData, TaxieData } from '../../types';
import { MaType } from './types';
export default function isMaSlopePositive(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
  ma: MaType,
) {
  let length = datas.length - 1;

  const indices = [
    length - (rollback_date + 3),
    length - (rollback_date + 2),
    length - (rollback_date + 1),
    length - rollback_date,
  ];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }

  const [index1, index2, index3, index4] = indices;
  if (
    datas[index1][ma] === undefined ||
    datas[index2][ma] === undefined ||
    datas[index3][ma] === undefined ||
    datas[index4][ma] === undefined
  )
    return false;
  const y = [
    datas[index1][ma],
    datas[index2][ma],
    datas[index3][ma],
    datas[index4][ma],
  ];
  const x = Array.from({ length: y.length }, (_, index) => index);
  const regression = simpleRegressionModel(x, y);
  const new_y = x.map((y) => regression.predictModel(y));
  if (slope(new_y) > 0) return true;
  return false;
}
