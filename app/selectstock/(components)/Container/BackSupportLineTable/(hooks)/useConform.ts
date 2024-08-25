import {
  isMovingAveragesPositiveOrder,
  isPriceDroppedAndRecoveredAboveMA,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
        MaType.MA60,
      ]) &&
      // 股價下跌不跌破均線
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
