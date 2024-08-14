import { MaType } from './types';

type DataPoint = {
  [key in MaType]?: number;
};

export default function isMovingAverageTrendUp(
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
      datas[index1][type] > datas[index2][type] &&
      datas[index2][type] > datas[index3][type]
    );
  return false;
}
