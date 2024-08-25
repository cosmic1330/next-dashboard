import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isIncreasingVolumeRedK(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  if (
    (datas[index1] as StockData).v !== undefined &&
    (datas[index2] as StockData).v !== undefined &&
    (datas[index1] as StockData).v > (datas[index2] as StockData).v &&
    datas[index1].c > datas[index2].o &&
    datas[index1].c > datas[index2].c
  ) {
    return '增量紅K';
  }
  return false;
}
