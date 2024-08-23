import { StockData } from '@/app/selectstock/types';

export default function isMaNegativeOrder(
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
    datas[index1].ma5 !== undefined &&
    datas[index1].ma5 !== null &&
    datas[index1].ma10 !== undefined &&
    datas[index1].ma10 !== null &&
    datas[index1].ma20 !== undefined &&
    datas[index1].ma20 !== null &&
    <number>datas[index1].ma5 < (datas[index1].ma10 as number) &&
    <number>datas[index1].ma10 < (datas[index1].ma20 as number)
  ) {
    return '均線空頭排列';
  }

  return false;
}
