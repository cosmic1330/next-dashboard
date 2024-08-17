import {
  isSlowStepwiseIncrease,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { useMemo } from 'react';

import { isMovingAveragesPositiveOrder } from '@/app/selectstock/(utils)/conditions';
import isThreeConsecutiveDaysAboveMovingAverage from '@/app/selectstock/(utils)/conditions/isThreeConsecutiveDaysAboveMovingAverage';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    let length = stockData.length - 1;
    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      // 收盤價持續大於10日均線
      isThreeConsecutiveDaysAboveMovingAverage(
        stockData,
        rollback_date,
        MaType.MA10,
      ) &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
        MaType.MA60,
      ]) &&
      isSlowStepwiseIncrease(stockData, rollback_date)
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
