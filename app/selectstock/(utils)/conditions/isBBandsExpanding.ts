import { StockData } from '../../types';
import { MaType } from './types';

export default function isBBandsExpanding(
  datas: StockData[],
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
    datas[index1][MaType.MA5] !== null &&
    datas[index2][MaType.MA5] !== null &&
    datas[index1][MaType.MA20] !== null &&
    datas[index2][MaType.MA20] !== null &&
    datas[index3][MaType.MA20] !== null &&
    datas[index1].bollUb !== null &&
    datas[index2].bollUb !== null &&
    datas[index1].bollLb !== null &&
    datas[index2].bollLb !== null &&
    datas[index3].bollUb !== null &&
    datas[index3].bollLb !== null &&
    datas[index1][MaType.MA5] !== undefined &&
    datas[index2][MaType.MA5] !== undefined &&
    datas[index1][MaType.MA20] !== undefined &&
    datas[index2][MaType.MA20] !== undefined &&
    datas[index3][MaType.MA20] !== undefined &&
    datas[index1].bollUb !== undefined &&
    datas[index2].bollUb !== undefined &&
    datas[index1].bollLb !== undefined &&
    datas[index2].bollLb !== undefined &&
    datas[index3].bollUb !== undefined &&
    datas[index3].bollLb !== undefined
  )
    return (
      datas[index1].c > datas[index1].bollUb &&
      datas[index2].c > datas[index2][MaType.MA20] &&
      datas[index3].c < datas[index3][MaType.MA20] &&
      datas[index1].bollUb > datas[index2].bollUb &&
      datas[index1].bollLb < datas[index2].bollLb &&
      datas[index2].bollUb < datas[index3].bollUb &&
      datas[index2].bollLb > datas[index3].bollLb
    );
  return false;
}
