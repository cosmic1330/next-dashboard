import { StockData } from '@/app/selectstock/types';

export default function isMa5NegativeTrend(
  datas: StockData[],
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
    datas[index1].ma5 === undefined ||
    datas[index1].ma5 === null ||
    datas[index2].ma5 === undefined ||
    datas[index2].ma5 === null ||
    datas[index3].ma5 === undefined ||
    datas[index3].ma5 === null
  ) {
    return false;
  }

  if (
    datas[index1].ma5 < datas[index2].ma5 &&
    datas[index2].ma5 < datas[index3].ma5
  ) {
    return '5日均線向下';
  }
  return false;
}