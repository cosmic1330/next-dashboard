import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isMa20PositiveTrend(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;

  const indices = [
    length - rollback_date,
    length - (rollback_date + 1),
    length - (rollback_date + 2),
  ];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2, index3] = indices;
  if (
    datas[index1].ma20 !== undefined &&
    datas[index1].ma20 !== null &&
    datas[index2].ma20 !== undefined &&
    datas[index2].ma20 !== null &&
    datas[index3].ma20 !== undefined &&
    datas[index3].ma20 !== null &&
    <number>datas[index1].ma20 > (datas[index2].ma20 as number) &&
    <number>datas[index2].ma20 > (datas[index3].ma20 as number)
  ) {
    return '20日均線向上';
  }

  return false;
}
