import {
  BreakResistanceAverageLine,
  isMovingAverageTrendUp,
  isNotBreakBelowMovingAverage,
} from '@/app/selectstock/(utils)/conditions';
import { useMemo } from 'react';

import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20) &&
      (BreakResistanceAverageLine(stockData, rollback_date, MaType.MA20) ||
        isNotBreakBelowMovingAverage(stockData, rollback_date, MaType.MA20) ||
        isNotBreakBelowMovingAverage(stockData, rollback_date, MaType.MA5))
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
