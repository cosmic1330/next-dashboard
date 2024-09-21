import { StockData, TaxieData } from '@/app/selectstock/types';
import { findPeaksByGradient } from '@ch20026103/anysis';
export default function isKdPositiveDivergence(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;
  const index1 = length - rollback_date;

  const kData = datas.map((data) => data.k as number);
  const peak = findPeaksByGradient(kData, 2);
  const peak1Index = peak[peak.length - 1];
  const peak2Index = peak[peak.length - 2];
  if (
    datas[index1]?.k !== undefined &&
    datas[index1]?.k !== null &&
    datas[peak1Index]?.k !== undefined &&
    datas[peak1Index]?.k !== null &&
    datas[peak2Index]?.k !== undefined &&
    datas[peak2Index]?.k !== null &&
    datas[index1]?.k < datas[peak1Index]?.k &&
    datas[peak1Index]?.k < datas[peak2Index]?.k &&
    datas[peak1Index]?.h > datas[peak2Index]?.h
  ) {
    return 'Kd正背離';
  }

  return false;
}
