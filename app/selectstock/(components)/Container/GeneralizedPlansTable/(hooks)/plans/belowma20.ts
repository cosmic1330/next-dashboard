import { StockData } from '@/app/selectstock/types';

import { isCloseAboveMa20 } from '@/app/selectstock/(utils)/assessment/positive';
import { isMovingAverageTrendUp } from '@/app/selectstock/(utils)/conditions';
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
    stockData[index1]?.l > stockData[index2]?.l &&
    isCloseAboveMa20(stockData, rollback_date) &&
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20)
  ) {
    return true;
  }
  return false;
}
