
import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isLowerAboveMa10(
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
    datas[index1].ma10 !== undefined &&
    datas[index1].ma10 !== null&&
    datas[index1].l >= (datas[index1].ma10 as number)
  ) {
    return '最低價10日線上';
  }

  return false;
}
