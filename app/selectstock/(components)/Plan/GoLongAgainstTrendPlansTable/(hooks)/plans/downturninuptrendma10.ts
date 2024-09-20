import {
  isCloseAboveMa10,
  isCloseAboveMa5,
  isLowerAboveMa10,
  isMaPositiveOrder,
} from '@/app/selectstock/(utils)/assessment/positive';
import { isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';

export default function downturninuptrend(
  stockData: StockData[],
  rollback_date: number,
) {
  let length = stockData.length - 1;
  const indices = [length - rollback_date, length - (rollback_date + 1)];
  if (indices.some((index) => index < 0 || index >= stockData.length)) {
    return false;
  }

  const [index1] = indices;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    stockData[index1].o > stockData[index1].c &&
    stockData[index1].dif > 0 &&
    isCloseAboveMa10(stockData, rollback_date) &&
    isLowerAboveMa10(stockData, rollback_date) &&
    isMaPositiveOrder(stockData, rollback_date)
  ) {
    return true;
  }
  return false;
}
