import { StockData } from '../../types';
import { MaType } from './types';

export default function isNotBreakBelowMovingAverage(
  datas: StockData[],
  rollback_date = 0,
  type: MaType = MaType.MA5,
) {
  let length = datas.length - 1;

  const indices = [
    length - rollback_date,
    length - (rollback_date + 1),
  ];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  if (
    datas[index1][type] !== undefined &&
    datas[index2][type] !== undefined
  )
    return (
      datas[index1].c > datas[index1][type] &&
      datas[index2].c > datas[index2][type] &&
      datas[index2].c < datas[index2].o &&
      datas[index1][type] > datas[index2][type]
    );
  return false;
}
