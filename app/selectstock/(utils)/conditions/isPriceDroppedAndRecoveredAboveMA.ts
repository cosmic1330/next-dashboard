import { MaType } from './types';

type BaseDataPoint = {
  c: number;
  l: number;
  o: number;
};

type DataPoint = BaseDataPoint & {
  [key in MaType]?: number;
};

export default function isPriceDroppedAndRecoveredAboveMA(
  datas: DataPoint[],
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
      datas[index1].c > datas[index1].o &&
      datas[index1][type] > datas[index2][type] &&
      datas[index2].l < datas[index2][type] &&
      datas[index2].c > datas[index2][type] &&
      (datas[index3].l < datas[index3][type] ||
        datas[index3].c < datas[index3][type])
    );
  return false;
}
