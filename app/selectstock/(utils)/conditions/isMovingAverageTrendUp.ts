import { MaType } from './types';

type DataPoint = {
  [key in MaType]?: number;
};

export default function isMovingAverageTrendUp(
  datas: DataPoint[],
  rollback_date = 0,
  type: MaType = MaType.MA5,
  days: number = 3,
) {
  let length = datas.length - 1;

  if (days < 2 || days >= datas.length) {
    return false;
  }
  const daysIndices = Array.from(
    { length: days },
    (_, i) => length - rollback_date - i,
  ).reverse();

  const ma = daysIndices.map((index) => datas[index][type]);

  for (let i = 0; i < ma.length - 1; i++) {
    const pre = ma[i];
    const next = ma[i + 1];
    if (pre === undefined || next === undefined || pre > next) {
      return false;
    }
  }
  return true;
}
