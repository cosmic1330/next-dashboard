import { StockData } from '@/app/selectstock/types';

export default function isObvGoldenCross(
  datas: StockData[],
  rollback_date: number,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;
  if (
    datas[index1].obv === null ||
    datas[index1].obv === undefined ||
    datas[index1].obv5Ma === null ||
    datas[index1].obv5Ma === undefined ||
    datas[index2].obv === null ||
    datas[index2].obv === undefined ||
    datas[index2].obv5Ma === null ||
    datas[index2].obv5Ma === undefined
  ) {
    return false;
  }

  if (
    datas[index1].obv > datas[index1].obv5Ma &&
    datas[index2].obv < datas[index2].obv5Ma
  ) {
    return 'Obv黃金交叉';
  }
  return false;
}
