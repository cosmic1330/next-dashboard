import { StockData } from '@/app/selectstock/types';

export default function isObvNegativeOrder(
  datas: StockData[],
  rollback_date: number,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  if (
    datas[index1].obv === undefined ||
    datas[index1].obv === null ||
    datas[index1].obv5Ma === undefined ||
    datas[index1].obv5Ma === null ||
    datas[index1].obv10Ma === undefined ||
    datas[index1].obv10Ma === null
  ) {
    return false;
  }

  if (
    datas[index1].obv < datas[index1].obv5Ma &&
    datas[index1].obv5Ma < datas[index1].obv10Ma
  ) {
    return 'Obv空頭排列';
  }
  return false;
}
