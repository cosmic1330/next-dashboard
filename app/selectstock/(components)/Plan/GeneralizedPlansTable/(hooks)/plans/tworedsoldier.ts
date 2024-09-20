import { isCloseAboveMa5 } from '@/app/selectstock/(utils)/assessment/positive';
import { isMovingAverageTrendUp, isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';

export default function tworedsoldier(
  stockData: StockData[],
  rollback_date: number,
) {
  let length = stockData.length - 1;

  const indices = [
    length - rollback_date,
    length - (rollback_date + 1),
    length - (rollback_date + 2),
  ];
  if (indices.some((index) => index < 0 || index >= stockData.length)) {
    return false;
  }
  const [index1, index2, index3] = indices;
  if (
    isSufficientTradingVolume(stockData, rollback_date, 300) &&
    stockData[index1].c > stockData[index2].h &&
    stockData[index1].h > stockData[index2].h &&
    stockData[index1].h > stockData[index3].h &&
    stockData[index1].l > stockData[index2].l &&
    Math.abs(
      ((stockData[index1].h - stockData[index2].l) / stockData[index2].l) * 100,
    ) < 5 &&
    isCloseAboveMa5(stockData, rollback_date) &&
    isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20)
  ) {
    return true;
  }
  return false;
}
