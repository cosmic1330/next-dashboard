import { isMovingAverageTrendUp, isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';

import {
  isCloseAboveMa5,
  isKdGoldenCross,
} from '@/app/selectstock/(utils)/assessment/positive';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
export default function goldencross(
  stockData: StockData[],
  rollback_date: number,
) {
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
    isCloseAboveMa5(stockData, rollback_date) &&
    isKdGoldenCross(stockData, rollback_date)
  ) {
    return true;
  }
  return false;
}
