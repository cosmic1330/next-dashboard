import { isMovingAverageTrendUp } from '@/app/selectstock/(utils)/conditions';
import { useMemo } from 'react';

import {
  isCloseAboveMa5,
  isKdGoldenCross,
} from '@/app/selectstock/(utils)/assessment/positive';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
      isCloseAboveMa5(stockData, rollback_date) &&
      isKdGoldenCross(stockData, rollback_date)
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
