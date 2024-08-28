import { StockData, TaxieData } from '@/app/selectstock/types';

export default function iswilliams8NegativeTrend(
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
    datas[index1].williams8 !== undefined &&
    datas[index1].williams8 !== null &&
    datas[index2].williams8 !== undefined &&
    datas[index2].williams8 !== null &&
    ((<number>datas[index1].williams8 < -20 &&
      <number>datas[index2].williams8 > -20) ||
      (<number>datas[index1].williams8 < -50 &&
        <number>datas[index2].williams8 > -50))
  ) {
    return '威廉進入弱勢';
  }

  return false;
}
