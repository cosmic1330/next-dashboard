import { StockData } from '../../types';

export default function isObvPositiveOrder(
  datas: StockData[],
  rollback_date = 0,
) {
  let length = datas.length - 1;
  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  if (
    datas[index1].obv !== undefined &&
    datas[index1].obv5Ma !== undefined &&
    datas[index1].obv10Ma !== undefined
  )
    return (
      <number>datas[index1].obv > <number>datas[index1].obv5Ma &&
      <number>datas[index1].obv5Ma > <number>datas[index1].obv10Ma
    );
  return false;
}
