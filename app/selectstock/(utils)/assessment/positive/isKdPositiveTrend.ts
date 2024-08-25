import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isKdPositiveTrend(
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
    datas[index1].k !== undefined &&
    datas[index1].k !== null &&
    datas[index1].d !== undefined &&
    datas[index1].d !== null &&
    datas[index2].k !== undefined &&
    datas[index2].k !== null &&
    datas[index1].rsv !== undefined &&
    datas[index1].rsv !== null &&
    datas[index2].rsv !== undefined &&
    datas[index2].rsv !== null &&
    <number>datas[index1].k > (datas[index1].d as number) &&
    <number>datas[index1].k > (datas[index2].k as number) &&
    <number>datas[index1].rsv > (datas[index2].rsv as number)
  ) {
    return 'KD趨勢向上';
  }

  return false;
}
