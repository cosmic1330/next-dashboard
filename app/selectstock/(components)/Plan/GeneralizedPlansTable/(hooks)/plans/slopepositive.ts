import { isMaSlopePositive } from '@/app/selectstock/(utils)/conditions';

import {
  isMacdInBullishZone,
  isMaPositiveOrder,
} from '@/app/selectstock/(utils)/assessment/positive';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';

export default function goldencross(
  stockData: StockData[],
  rollback_date: number,
) {
  if (
    isMacdInBullishZone(stockData, rollback_date) &&
    isMaPositiveOrder(stockData, rollback_date) &&
    isMaSlopePositive(stockData, rollback_date, MaType.MA5) &&
    isMaSlopePositive(stockData, rollback_date, MaType.MA10) &&
    isMaSlopePositive(stockData, rollback_date, MaType.MA20)
  ) {
    return true;
  }
  return false;
}
