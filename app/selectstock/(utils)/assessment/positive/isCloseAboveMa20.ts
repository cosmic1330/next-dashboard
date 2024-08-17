import { StockData } from '@/app/selectstock/types';

export default function isCloseAboveMa20(
  datas: StockData[],
  rollback_date: number,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  if (datas[index1].ma20 === undefined || datas[index1].ma20 === null) {
    return false;
  }

  if (datas[index1].c > datas[index1].ma20) {
    return '20日線上';
  }
  return false;
}
