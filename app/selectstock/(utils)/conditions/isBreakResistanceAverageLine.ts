import { StockData } from '../../types';
import { MaType } from './types';

export default function isBreakResistanceAverageLine(
  datas: StockData[],
  rollback_date = 0,
  type: MaType = MaType.MA20,
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
    datas[index3][type] !== undefined
  )
    return (
      datas[index1].c > (datas[index1][type] as number) &&
      datas[index2].h > (datas[index2][type] as number) &&
      datas[index2].c < (datas[index2][type] as number) &&
      datas[index3].c < (datas[index3][type] as number)
    );
  return false;
}
