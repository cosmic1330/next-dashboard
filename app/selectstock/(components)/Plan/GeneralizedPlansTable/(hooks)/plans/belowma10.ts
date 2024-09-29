import { StockData } from '@/app/selectstock/types';

import {
  isCloseAboveMa5,
  isCloseAboveMa10,
  isLowerAboveMa10,
  isMacdInBullishZone,
  isMaPositiveOrder,
} from '@/app/selectstock/(utils)/assessment/positive';
import {
  isMovingAverageTrendUp,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
export default function belowma20(
  stockData: StockData[],
  rollback_date: number,
) {
  let length = stockData.length - 1;

  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= stockData.length)) {
    return false;
  }
  const [index1, index2] = indices;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isCloseAboveMa5(stockData, rollback_date) &&
    isLowerAboveMa10(stockData, rollback_date) &&
    isCloseAboveMa10(stockData, rollback_date+1) &&
    isLowerAboveMa10(stockData, rollback_date+1) &&
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20) &&
    isMacdInBullishZone(stockData, rollback_date)
  ) {
    return true;
  }
  return false;
}
