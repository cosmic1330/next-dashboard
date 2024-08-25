import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isPositiveEngulfing(
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
    datas[index1].h > datas[index2].h &&
    datas[index1].l < datas[index2].l &&
    datas[index1].o < datas[index1].c &&
    datas[index2].o > datas[index2].c
  ) {
    return '陽吞噬(適用低檔)';
  }
  return false;
}
