import { isMaSlopePositive } from '@/app/selectstock/(utils)/conditions';
import { useMemo } from 'react';

import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (
      isMaSlopePositive(stockData, rollback_date, MaType.MA5) &&
      isMaSlopePositive(stockData, rollback_date, MaType.MA10) &&
      isMaSlopePositive(stockData, rollback_date, MaType.MA20)
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
