import { StockData } from '../../types';

export default function isObvGoldenCross(
  datas: StockData[],
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
      datas[index1].obv > datas[index2].obv &&
      datas[index1].obv > datas[index1].obv5Ma &&
      datas[index2].obv < datas[index2].obv5Ma
    );
  return false;
}
