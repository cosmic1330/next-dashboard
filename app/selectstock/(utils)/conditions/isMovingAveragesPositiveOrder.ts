import { MaType } from './types';
type DataPoint = {
  [key in MaType]?: number;
};
type AllowedMaType =
  | MaType.MA5
  | MaType.MA10
  | MaType.MA20
  | MaType.MA60
  | MaType.MA120;

export default function isMovingAveragesPositiveOrder(
  datas: DataPoint[],
  rollback_date = 0,
  ma: AllowedMaType[],
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  const check = ma.every((maType) => datas[index1][maType] !== undefined);

  if (check && ma.length > 1) {
    for (let i = 0; i < ma.length - 1; i++) {
      const currentMa = ma[i];
      const nextMa = ma[i + 1];
      if (
        datas[index1][currentMa] &&
        datas[index1][nextMa] &&
        datas[index1][currentMa] < datas[index1][nextMa]
      ) {
        return false;
      }
    }
    return true;
  }
  return false;
}
