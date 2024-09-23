import {
  isCloseAboveMa20,
  isMaPositiveOrder,
} from '@/app/selectstock/(utils)/assessment/positive';
import {
  isKbarSmallDeviationFromMA,
  isMaSlopePositive,
  isMovingAverageTrendUp,
  isMutiConsecutiveDaysAboveMovingAverage,
  isNotBreakBelowMovingAverage,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
export default function steadygradualrise(
  stockData: StockData[],
  rollback_date: number,
) {
  let length = stockData.length - 1;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isMaPositiveOrder(stockData, rollback_date) &&
    (isCloseAboveMa20(stockData, rollback_date) ||
      isNotBreakBelowMovingAverage(stockData, rollback_date, MaType.MA20)) &&
    isMutiConsecutiveDaysAboveMovingAverage(
      stockData,
      rollback_date,
      MaType.MA20,
      7,
    ) &&
    (isMovingAverageTrendUp(stockData, rollback_date, MaType.MA60) ||
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20)) &&
    isKbarSmallDeviationFromMA(stockData, rollback_date, MaType.MA5, 3) &&
    isKbarSmallDeviationFromMA(stockData, rollback_date, MaType.MA10, 3) &&
    isKbarSmallDeviationFromMA(stockData, rollback_date, MaType.MA20, 3) &&
    isMaSlopePositive(stockData, rollback_date, MaType.MA5, 0, 7) &&
    isMaSlopePositive(stockData, rollback_date, MaType.MA10, 0, 7) &&
    isMaSlopePositive(stockData, rollback_date, MaType.MA20, 0, 7)
  ) {
    return true;
  }
  return false;
}
