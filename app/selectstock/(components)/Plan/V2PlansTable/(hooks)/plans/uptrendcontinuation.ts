import {
  isMovingAveragesPositiveOrder,
  isNoBreakBelowBullishCandleMidpoint,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
export default function uptrendcontinuation(
  stockData: StockData[],
  rollback_date: number,
) {
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isNoBreakBelowBullishCandleMidpoint(stockData, rollback_date) &&
    isMovingAveragesPositiveOrder(stockData, rollback_date, [
      MaType.MA5,
      MaType.MA10,
    ])
  ) {
    return true;
  }
  return false;
}
