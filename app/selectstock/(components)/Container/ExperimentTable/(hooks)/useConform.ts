import {
  isMovingAverageTrendUp,
  isNoBreakBelowBullishCandleMidpoint,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { useMemo } from 'react';

import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (isNoBreakBelowBullishCandleMidpoint(stockData, rollback_date)
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
