import { StockData, TaxieData } from '@/app/selectstock/types';

export default function isMacdInBullishZone(
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
    datas[index1].dif !== undefined &&
    datas[index1].dif !== null &&
    <number>datas[index1].dif > 0
  ) {
    return 'Macd位於多方區域';
  }

  return false;
}
