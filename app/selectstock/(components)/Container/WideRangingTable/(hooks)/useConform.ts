import {
  isMaSlopePositive,
  isMovingAveragesPositiveOrder,
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
      isSufficientTradingVolume(stockData, rollback_date, 500) &&
      isMaSlopePositive(stockData, rollback_date) &&
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
      ])
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
