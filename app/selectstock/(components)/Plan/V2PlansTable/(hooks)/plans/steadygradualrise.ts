import {
  isSlowStepwiseIncrease,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';
export default function steadygradualrise(
  stockData: StockData[],
  rollback_date: number,
) {
  let length = stockData.length - 1;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    isSlowStepwiseIncrease(stockData, rollback_date)
  ) {
    return true;
  }
  return false;
}
