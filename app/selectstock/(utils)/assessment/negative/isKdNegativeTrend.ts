import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isKdNegativeTrend(
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
    <number>datas[index1].k < <number>datas[index1].d &&
    <number>datas[index1].k < <number>datas[index2].k &&
    <number>datas[index1].rsv < <number>datas[index2].rsv
  ) {
    return 'KD趨勢向下';
  }
  return false;
}
