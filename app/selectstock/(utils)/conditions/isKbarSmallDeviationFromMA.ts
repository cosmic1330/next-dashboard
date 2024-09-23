import { MaType } from './types';

type BaseDataPoint = {
  c: number;
  o: number;
  l: number;
  h: number;
};

type DataPoint = BaseDataPoint & {
  [key in MaType]?: number;
};

export default function isKbarSmallDeviationFromMA(
  datas: DataPoint[],
  rollback_date = 0,
  type: MaType = MaType.MA5,
  percent: number = 3, // K-bar與均線差距小於%
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;

  if (datas[index1][type] !== undefined) {
    return (
      (datas[index1].l > <number>datas[index1][type] && // 跳高
        Math.abs(
          ((datas[index1].l - <number>datas[index1][type]) /
            <number>datas[index1][type]) *
            100,
        ) < percent) ||
      (datas[index1][type] > <number>datas[index1].h && // 跳空
        Math.abs(
          ((datas[index1][type] - <number>datas[index1].h) /
            <number>datas[index1].h) *
            100,
        ) < percent) ||
      (datas[index1][type] > <number>datas[index1].l && // 平盤
        datas[index1].h > <number>datas[index1][type])
    );
  }
  return false;
}
