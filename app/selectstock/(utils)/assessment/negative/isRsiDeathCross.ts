import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isRsiDeathCross(
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
    datas[index1].rsi5 !== undefined &&
    datas[index1].rsi10 !== undefined &&
    datas[index2].rsi5 !== undefined &&
    datas[index2].rsi10 !== undefined &&
    datas[index1].rsi5 < datas[index1].rsi10 &&
    datas[index2].rsi5 > datas[index2].rsi10
  ) {
    return 'Rsi死亡交叉';
  }
  return false;
}
