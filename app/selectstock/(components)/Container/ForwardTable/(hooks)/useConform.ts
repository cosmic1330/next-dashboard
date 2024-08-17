import {
  isMovingAverageTrendUp,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { useMemo } from 'react';

import { isMovingAveragesPositiveOrder } from '@/app/selectstock/(utils)/conditions';
import isThreeConsecutiveDaysAbove5Ma from '@/app/selectstock/(utils)/conditions/isThreeConsecutiveDaysAboveMovingAverage';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    let length = stockData.length - 1;
    if (
      isSufficientTradingVolume(stockData, rollback_date, 500) &&
      // 收盤價持續大於10日均線
      isThreeConsecutiveDaysAbove5Ma(stockData, rollback_date, MaType.MA10) &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
        MaType.MA60,
      ]) &&
      // 10日線往上
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA10) &&
      // 五日均線往上
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5) &&
      // 月線及五日均線差距小於3%
      ((<number>stockData[length - rollback_date].ma5 -
        <number>stockData[length - rollback_date].ma20) /
        <number>stockData[length - rollback_date].ma20) *
        100 <
        3
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
