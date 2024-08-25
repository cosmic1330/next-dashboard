import { StockData, TaxieData } from '../../types';

export default function isObvGoldenCross(
  datas: StockData[] | TaxieData[],
  rollback_date = 0,
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1, index2] = indices;
  if (
    datas[index1].obv !== undefined &&
    datas[index2].obv !== undefined &&
    datas[index1].obv5Ma !== undefined &&
    datas[index2].obv5Ma !== undefined
  )
    return (
      <number>datas[index1].obv > <number>datas[index2].obv &&
      <number>datas[index1].obv > <number>datas[index1].obv5Ma &&
      <number>datas[index2].obv5Ma > <number>datas[index2].obv
    );
  return false;
}
