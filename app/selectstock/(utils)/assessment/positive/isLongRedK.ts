import { StockData } from '@/app/selectstock/types';

export default function isLongRedK(datas: StockData[], rollback_date: number) {
  let length = datas.length - 1;

  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  if (
    ((datas[index1].h - datas[index1].c) / datas[index1].c) * 100 <= 1 &&
    ((datas[index1].c - datas[index1].l) / datas[index1].l) * 100 >= 4 &&
    ((datas[index1].o - datas[index1].l) / datas[index1].l) * 100 <= 1 &&
    datas[index1].c > datas[index1].o &&
    datas[index1].c > datas[index2].c
  ) {
    return '長紅K';
  }
  return false;
}
