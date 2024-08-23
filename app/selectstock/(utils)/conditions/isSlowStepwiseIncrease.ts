import { StockData } from '../../types';

export default function isSlowStepwiseIncrease(
  datas: StockData[],
  rollback_date = 0,
  days: number = 10,
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

  const daysIndices = Array.from(
    { length: days },
    (_, i) => length - rollback_date - i,
  ).reverse();

  if (
    datas[index1].ma5 !== undefined &&
    datas[index1].ma10 !== undefined &&
    datas[index1].ma20 !== undefined &&
    datas[index1].ma60 !== undefined
  )
    return (
      datas[index1].h > datas[index2].h &&
      datas[index1].h > datas[index3].h &&
      datas[index1].c > <number>datas[index1].ma5 &&
      datas[index1].c > datas[index2].c &&
      <number>datas[index1].ma5 > <number>datas[index1].ma10 &&
      <number>datas[index1].ma10 > <number>datas[index1].ma20 &&
      <number>datas[index1].ma20 > <number>datas[index1].ma60
    );
  return false;
}
