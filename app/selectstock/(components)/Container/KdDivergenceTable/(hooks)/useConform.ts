import {
  isMovingAverageTrendUp,
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
    let length = stockData.length - 1;
    if (
      // 成交量大於1000張
      isSufficientTradingVolume(stockData, rollback_date, 500) &&
      // 月線往上
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20) &&
      // 季線往上
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA60) &&
      // macd osc增加
      <number>stockData[length - rollback_date]?.osc >
        <number>stockData[length - (rollback_date + 1)]?.osc &&
      // KD 低點反轉
      <number>stockData[length - (rollback_date + 1)]?.k <
        <number>stockData[length - (rollback_date + 1)]?.d &&
      <number>stockData[length - (rollback_date + 2)]?.k <
        <number>stockData[length - (rollback_date + 2)]?.d &&
      <number>stockData[length - rollback_date]?.k >
        <number>stockData[length - (rollback_date + 1)]?.k &&
      <number>stockData[length - rollback_date]?.d <
        <number>stockData[length - (rollback_date + 1)]?.d &&
      // rsv
      <number>stockData[length - rollback_date].rsv >
        <number>stockData[length - (rollback_date + 1)].rsv &&
      <number>stockData[length - rollback_date].rsv < 75 &&
      <number>stockData[length - rollback_date].rsv > 30
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
