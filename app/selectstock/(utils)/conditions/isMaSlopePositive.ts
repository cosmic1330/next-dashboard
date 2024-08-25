import { slope } from '@ch20026103/anysis';
import { StockData, TaxieData } from '../../types';
export default function isMaSlopePositive(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
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
    datas[index1].ma5 === undefined ||
    datas[index2].ma5 === undefined ||
    datas[index3].ma5 === undefined ||
    datas[index4].ma5 === undefined ||
    datas[index1].ma10 === undefined ||
    datas[index2].ma10 === undefined ||
    datas[index3].ma10 === undefined ||
    datas[index4].ma10 === undefined ||
    datas[index1].ma20 === undefined ||
    datas[index2].ma20 === undefined ||
    datas[index3].ma20 === undefined ||
    datas[index4].ma20 === undefined
  )
    return false;

  const ma5Slope = slope([
    <number>datas[index1].ma5,
    <number>datas[index2].ma5,
    <number>datas[index3].ma5,
    <number>datas[index4].ma5,
  ]);
  const ma10Slope = slope([
    <number>datas[index1].ma10,
    <number>datas[index2].ma10,
    <number>datas[index3].ma10,
    <number>datas[index4].ma10,
  ]);
  const ma20Slope = slope([
    <number>datas[index1].ma20,
    <number>datas[index2].ma20,
    <number>datas[index3].ma20,
    <number>datas[index4].ma20,
  ]);

  if (ma5Slope > 0.3 && ma10Slope > 0.3 && ma20Slope > 0.3) return true;
  return false;
}
