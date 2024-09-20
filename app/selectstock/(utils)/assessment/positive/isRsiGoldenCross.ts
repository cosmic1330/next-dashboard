import { StockData, TaxieData } from '../../../types';

export default function isKDGoldenCross(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
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
    datas[index1].rsi5 !== undefined &&
    datas[index1].rsi10 !== undefined &&
    datas[index2].rsi5 !== undefined &&
    datas[index2].rsi10 !== undefined &&
    datas[index1].rsi5 > datas[index1].rsi10 &&
    datas[index2].rsi5 < datas[index2].rsi10
  ) {
    return 'Rsi黃金交叉';
  }

  return false;
}
