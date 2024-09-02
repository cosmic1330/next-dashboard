import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isCloseAboveMa5(
  datas: StockData[] | TaxieData[],
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
    datas[index1].c >= (datas[index1].ma5 as number)
  ) {
    return '5日線上';
  }

  return false;
}
