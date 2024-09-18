import {
  BreakResistanceAverageLine,
  isMovingAverageTrendUp,
  isNotBreakBelowMovingAverage,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';

import { MaType } from '@/app/selectstock/(utils)/conditions/types';

export default function heldsupportline(
  stockData: StockData[],
  rollback_date: number,
) {
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20) &&
    (BreakResistanceAverageLine(stockData, rollback_date, MaType.MA20) ||
      isNotBreakBelowMovingAverage(stockData, rollback_date, MaType.MA20) ||
      isNotBreakBelowMovingAverage(stockData, rollback_date, MaType.MA5))
  ) {
    return true;
  }
  return false;
}
