import { slope } from '@ch20026103/anysis';

export default function isSlowStepwiseIncrease(
  datas: { h: number; l: number; c: number; o: number; ma20: number }[],
  rollback_date = 0,
  days: number = 10,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;

  const daysIndices = Array.from(
    { length: days },
    (_, i) => length - rollback_date - i,
  ).reverse();
  const checkClose = daysIndices.every(
    (index) => datas[index].c > datas[index].ma20,
  );
  const checkMa = daysIndices
    .slice(1, days)
    .every((index) => datas[index].ma20 > datas[index - 1].ma20);
  const ma20 = slope(daysIndices.map((index) => datas[index].ma20));

  if (checkClose && checkMa && ma20 <= 0.3 && ma20 >= 0) return true;
  return false;
}
