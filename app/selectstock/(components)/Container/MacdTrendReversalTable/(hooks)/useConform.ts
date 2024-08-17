import {
  isBearishEngulfing,
  isMacdPositiveWithDecreasingGreenBars,
  isOscHistogramTurningPositive,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { useMemo } from 'react';

import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    let length = stockData.length - 1;
    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      (isBearishEngulfing(stockData, rollback_date) ||
        (isOscHistogramTurningPositive(stockData, rollback_date) &&
          isMacdPositiveWithDecreasingGreenBars(stockData, rollback_date)))
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
