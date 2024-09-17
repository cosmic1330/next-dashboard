import {
  isBearishEngulfing,
  isMovingAveragesPositiveOrder,
  isMovingAverageTrendUp,
  isOscHistogramTurningPositive,
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
    // if (
    //   isSufficientTradingVolume(stockData, rollback_date, 300) &&
    //   isMovingAveragesPositiveOrder(stockData, rollback_date, [
    //     MaType.MA5,
    //     MaType.MA10,
    //     MaType.MA20,
    //     MaType.MA60,
    //   ]) &&
    //   isBearishEngulfing(stockData, rollback_date) &&
    //   isOscHistogramTurningPositive(stockData, rollback_date) &&
    //   isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5)
    // ) {
    //   return true;
    // }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
