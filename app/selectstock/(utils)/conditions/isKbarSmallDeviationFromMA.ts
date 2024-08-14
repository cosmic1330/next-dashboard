import { MaType } from './types';

type BaseDataPoint = {
  c: number;
  o: number;
  l: number;
};

type DataPoint = BaseDataPoint & {
  [key in MaType]?: number;
};

export default function isKbarSmallDeviationFromMA(
  datas: DataPoint[],
  rollback_date = 0,
  type: MaType = MaType.MA5,
  percent: number = 3,
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  if (datas[index1][type] !== undefined && datas[index2][type] !== undefined) {
    return (
      datas[index1].c > datas[index1].o &&
      datas[index1].c > datas[index1][type] &&
      datas[index2].c > datas[index2][type] &&
      datas[index1].l > datas[index1][type] &&
      ((datas[index1].l - datas[index1][type]) / datas[index1][type]) * 100 <
        percent // K-bar與均線差距小於%
    );
  }
  return false;
}
