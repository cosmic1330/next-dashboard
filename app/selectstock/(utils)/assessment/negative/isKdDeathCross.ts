import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isKdDeathCross(
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
    datas[index1].k !== null &&
    datas[index1].k !== undefined &&
    datas[index1].d !== null &&
    datas[index1].d !== undefined &&
    datas[index2].k !== null &&
    datas[index2].k !== undefined &&
    datas[index2].d !== null &&
    datas[index2].d !== undefined &&
    <number>datas[index1].d > <number>datas[index1].k &&
    <number>datas[index2].k > <number>datas[index2].d
  ) {
    return 'KD死亡交叉';
  }
  return false;
}
