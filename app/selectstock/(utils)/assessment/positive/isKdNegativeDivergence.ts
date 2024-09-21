import { StockData, TaxieData } from '@/app/selectstock/types';
import { findTroughByGradient } from '@ch20026103/anysis';
export default function isKdNegativeDivergence(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;
  const index1 = length - rollback_date;

  const kData = datas.map((data) => data.k as number);
  const trough = findTroughByGradient(kData, 2);
  const trough1Index = trough[trough.length - 1];
  const trough2Index = trough[trough.length - 2];
  if (
    datas[index1]?.k !== undefined &&
    datas[index1]?.k !== null &&
    datas[trough1Index]?.k !== undefined &&
    datas[trough1Index]?.k !== null &&
    datas[trough2Index]?.k !== undefined &&
    datas[trough2Index]?.k !== null &&
    datas[index1]?.k > datas[trough1Index]?.k &&
    datas[trough1Index]?.k > datas[trough2Index]?.k &&
    datas[trough1Index]?.c < datas[trough2Index]?.c
  ) {
    return 'Kd負背離';
  }
  return false;
}
