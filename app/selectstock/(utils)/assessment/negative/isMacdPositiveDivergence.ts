import { StockData, TaxieData } from '@/app/selectstock/types';
import { findPeaksByGradient } from '@ch20026103/anysis';

export default function isMacdPositiveDivergence(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;
  const index1 = length - rollback_date;

  const difData = datas.map((data) => data.dif as number);
  const peak = findPeaksByGradient(difData, 2);
  const peak1Index = peak[peak.length - 1];
  const peak2Index = peak[peak.length - 2];
  if (
    datas[index1]?.dif !== undefined &&
    datas[index1]?.dif !== null &&
    datas[peak1Index]?.dif !== undefined &&
    datas[peak1Index]?.dif !== null &&
    datas[peak2Index]?.dif !== undefined &&
    datas[peak2Index]?.dif !== null &&
    datas[index1]?.dif < datas[peak1Index]?.dif &&
    datas[peak1Index]?.dif < datas[peak2Index]?.dif &&
    datas[peak1Index]?.h > datas[peak2Index]?.h
  ) {
    return 'Macd正背離';
  }

  return false;
}
