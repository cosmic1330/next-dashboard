import { MaType } from './types';

export default function isBBandsExpanding(
  datas: {
    c: number;
    bollUb: number | null;
    bollLb: number | null;
    [MaType.MA5]: number;
    [MaType.MA10]: number;
  }[],
  rollback_date = 0,
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
    datas[index2][MaType.MA5] !== undefined &&
    datas[index1].bollUb !== null &&
    datas[index2].bollUb !== null &&
    datas[index1].bollLb !== null &&
    datas[index2].bollLb !== null &&
    datas[index3].bollUb !== null &&
    datas[index3].bollLb !== null
  )
    return (
      datas[index1].c > datas[index1][MaType.MA5] &&
      datas[index2].c > datas[index2][MaType.MA5] &&
      datas[index1][MaType.MA5] > datas[index1][MaType.MA10] &&
      datas[index1][MaType.MA5] > datas[index2][MaType.MA5] &&
      datas[index1][MaType.MA10] > datas[index2][MaType.MA10] &&
      datas[index1].bollUb > datas[index2].bollUb &&
      datas[index1].bollLb < datas[index2].bollLb
    );
  return false;
}
