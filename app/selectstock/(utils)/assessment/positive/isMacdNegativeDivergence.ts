import { StockData, TaxieData } from '@/app/selectstock/types';
import { findTroughByGradient } from '@ch20026103/anysis';

export default function isMacdNegativeDivergence(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;
  const index1 = length - rollback_date;

  const difData = datas.map((data) => data.k as number);
  const trough = findTroughByGradient(difData, 2);
  const trough1Index = trough[trough.length - 1];
  const trough2Index = trough[trough.length - 2];
  if (
    datas[index1]?.dif !== undefined &&
    datas[index1]?.dif !== null &&
    datas[trough1Index]?.dif !== undefined &&
    datas[trough1Index]?.dif !== null &&
    datas[trough2Index]?.dif !== undefined &&
    datas[trough2Index]?.dif !== null &&
    datas[index1]?.dif > datas[trough1Index]?.dif &&
    datas[trough1Index]?.dif > datas[trough2Index]?.dif &&
    datas[trough1Index]?.l < datas[trough2Index]?.l
  ) {
    return 'Macd負背離';
  }
  return false;
}
