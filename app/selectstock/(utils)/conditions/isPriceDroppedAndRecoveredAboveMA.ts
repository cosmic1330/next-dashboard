import { StockData, TaxieData } from '../../types';
import { MaType } from './types';

export default function isPriceDroppedAndRecoveredAboveMA(
  datas: StockData[] | TaxieData[],
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
    datas[index3][type] !== undefined
  )
    return (
      datas[index1].h > datas[index2].h &&
      datas[index1].l > datas[index2].l &&
      datas[index1].c > datas[index2].c &&
      datas[index1].c > <number>datas[index1][type] &&
      datas[index2].c > <number>datas[index2][type] &&
      <number>datas[index3][type] > datas[index3].c
    );
  return false;
}
