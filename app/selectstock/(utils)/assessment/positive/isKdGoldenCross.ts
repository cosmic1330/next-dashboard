import { StockData } from '@/app/selectstock/types';

export default function isKdGoldenCross(
  datas: StockData[],
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
    <number>datas[index1].k > (datas[index1].d as number) &&
    <number>datas[index2].k < (datas[index2].d as number)
  ) {
    return 'KD黃金交叉';
  }

  return false;
}
