import { StockData, TaxieData } from '@/app/selectstock/types';
import { findPeaksByGradient } from '@ch20026103/anysis';
export default function isObvRisingHighs(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;
  const index1 = length - rollback_date;

  const obvData = datas.map((data) => data.obv as number);
  const peak = findPeaksByGradient(obvData, 1);
  const peak1Index = peak[peak.length - 1];
  const peak2Index = peak[peak.length - 2];
  if (
    datas[index1].obv !== undefined &&
    datas[index1].obv !== null &&
    datas[peak1Index].obv !== undefined &&
    datas[peak1Index].obv !== null &&
    datas[peak2Index].obv !== undefined &&
    datas[peak2Index].obv !== null &&
    datas[index1].obv > datas[peak2Index].obv &&
    datas[peak1Index].obv > datas[peak2Index].obv
  ) {
    return 'Obv頭頭高';
  }

  return false;
}
