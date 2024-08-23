import { StockData } from '../../types';
import { MaType } from './types';

export default function isThreeConsecutiveDaysAboveMovingAverage(
  datas: StockData[],
  rollback_date = 0,
  type: MaType = MaType.MA5,
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
    datas[index1][type] !== undefined &&
    datas[index2][type] !== undefined &&
    datas[index3][type] !== undefined &&
    datas[index1][MaType.MA5] !== undefined &&
    datas[index2][MaType.MA5] !== undefined &&
    datas[index1][MaType.MA10] !== undefined &&
    datas[index2][MaType.MA10] !== undefined
  )
    return (
      datas[index1].c > <number>datas[index1][type] &&
      datas[index2].c > <number>datas[index2][type] &&
      datas[index3].c > <number>datas[index3][type] &&
      <number>datas[index1][MaType.MA5] > <number>datas[index2][MaType.MA5] &&
      <number>datas[index1][MaType.MA10] > <number>datas[index2][MaType.MA10]
    );
  return false;
}
