import { isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { useMemo } from 'react';
import {
  isMovingAveragesPositiveOrder,
  isPriceDroppedAndRecoveredAboveMA,
} from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    let length = stockData.length - 1;
    if (
      // 股價下跌不跌破均線
      isSufficientTradingVolume(stockData, rollback_date, 1000) &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
      ]) &&
      (isPriceDroppedAndRecoveredAboveMA(
        stockData,
        rollback_date,
        MaType.MA5,
      ) ||
        isPriceDroppedAndRecoveredAboveMA(
          stockData,
          rollback_date,
          MaType.MA10,
        ) ||
        isPriceDroppedAndRecoveredAboveMA(
          stockData,
          rollback_date,
          MaType.MA20,
        ))
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
