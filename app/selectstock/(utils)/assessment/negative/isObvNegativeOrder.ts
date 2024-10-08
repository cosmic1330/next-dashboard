import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isObvNegativeOrder(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;

  const indices = [length - rollback_date];
  if (indices.some((index) => index < 0 || index >= datas.length)) {
    return false;
  }
  const [index1] = indices;
  if (
    datas[index1].obv !== undefined &&
    datas[index1].obv !== null &&
    datas[index1].obv5Ma !== undefined &&
    datas[index1].obv5Ma !== null &&
    datas[index1].obv10Ma !== undefined &&
    datas[index1].obv10Ma !== null &&
    <number>datas[index1].obv < (datas[index1].obv5Ma as number) &&
    <number>datas[index1].obv5Ma < (datas[index1].obv10Ma as number)
  ) {
    return 'Obv空頭排列';
  }

  return false;
}
