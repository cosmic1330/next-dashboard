import {
  isMovingAveragesPositiveOrder,
  isMovingAverageTrendUp,
  isThreeConsecutiveDaysAboveMovingAverage,
} from '@/app/selectstock/(utils)/conditions';
import { useMemo } from 'react';

import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
import { isCloseAboveMa5 } from '@/app/selectstock/(utils)/assessment/positive';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (
      // https://www.youtube.com/watch?v=_LQlpgiIm5g
      // 威廉指標溫度計(價格站上五日線、五日均線往上、威廉進入超買區) 威廉指標>50為轉多訊號
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
      isCloseAboveMa5(stockData, rollback_date) &&
      <number>stockData[stockData.length - 1].williams14 > -20
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
