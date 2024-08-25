import { StockData, TaxieData } from '../../types';
import { MaType } from './types';

export default function isGoldPlatedSilver(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
  pressure: MaType.MA120 | MaType.MA240 | MaType.MA60 = MaType.MA60,
  steady: MaType.MA20 | MaType.MA60 = MaType.MA60,
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
    datas[index1].ma5 !== undefined &&
    datas[index1].ma10 !== undefined &&
    datas[index1].ma20 !== undefined &&
    datas[index1].ma60 !== undefined &&
    datas[index2].ma60 !== undefined &&
    datas[index1][pressure] !== undefined &&
    datas[index2][pressure] !== undefined &&
    datas[index3][pressure] !== undefined
  )
    return steady === MaType.MA60
      ? <number>datas[index1].ma5 > <number>datas[index1][steady] &&
          <number>datas[index1].ma10 > <number>datas[index1][steady] &&
          <number>datas[index1].ma20 > <number>datas[index1][steady] &&
          <number>datas[index1][pressure] > <number>datas[index1].ma5 &&
          <number>datas[index1][pressure] > <number>datas[index1].ma10 &&
          <number>datas[index1][pressure] > <number>datas[index1].ma20 &&
          <number>datas[index1][pressure] > <number>datas[index1][steady] &&
          <number>datas[index1][steady] > <number>datas[index2][steady] &&
          <number>datas[index2][steady] > <number>datas[index3][steady] &&
          <number>datas[index2][pressure] > <number>datas[index1][pressure] &&
          <number>datas[index3][pressure] > <number>datas[index2][pressure]
      : <number>datas[index1].ma5 > <number>datas[index1][steady] &&
          <number>datas[index1].ma10 > <number>datas[index1][steady] &&
          <number>datas[index1][pressure] > <number>datas[index1].ma5 &&
          <number>datas[index1][pressure] > <number>datas[index1].ma10 &&
          <number>datas[index1][pressure] > <number>datas[index1][steady] &&
          <number>datas[index1][steady] > <number>datas[index2][steady] &&
          <number>datas[index2][steady] > <number>datas[index3][steady] &&
          <number>datas[index2][pressure] > <number>datas[index1][pressure] &&
          <number>datas[index3][pressure] > <number>datas[index2][pressure];
  return false;
}
