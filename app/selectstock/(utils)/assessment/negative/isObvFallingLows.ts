import { StockData, TaxieData } from '@/app/selectstock/types';
import { findTroughByGradient } from '@ch20026103/anysis';
export default function isObvFallingLows(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  let length = datas.length - 1;
  const index1 = length - rollback_date;

  const obvData = datas.map((data) => data.obv as number);
  const trough = findTroughByGradient(obvData, 1);
  const trough1Index = trough[trough.length - 1];
  const trough2Index = trough[trough.length - 2];
  if (
    datas[index1]?.obv !== undefined &&
    datas[index1]?.obv !== null &&
    datas[trough1Index]?.obv !== undefined &&
    datas[trough1Index]?.obv !== null &&
    datas[trough2Index]?.obv !== undefined &&
    datas[trough2Index]?.obv !== null &&
    datas[index1]?.obv < datas[trough2Index]?.obv &&
    datas[trough1Index]?.obv < datas[trough2Index]?.obv
  ) {
    return 'Obv底底低';
  }

  return false;
}
