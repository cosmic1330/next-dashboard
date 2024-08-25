import {
  isBBandsExpanding,
  isKbarSmallDeviationFromMA,
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
    let length = stockData.length - 1;
    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
      ]) &&
      isBBandsExpanding(stockData, rollback_date) &&
      // K棒未跳高
      isKbarSmallDeviationFromMA(stockData, rollback_date, MaType.MA5, 1)
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
