import {
  isIncreasingVolumeRedK,
  isOscContractionSignalsBottoming,
} from '@/app/selectstock/(utils)/assessment/positive';
import {
  isKDGoldenCross,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';
export default function uptrendcontinuation(
  stockData: StockData[],
  rollback_date: number,
) {
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isOscContractionSignalsBottoming(stockData, rollback_date) &&
    isKDGoldenCross(stockData, rollback_date) &&
    isIncreasingVolumeRedK(stockData, rollback_date)
  ) {
    return true;
  }
  return false;
}
