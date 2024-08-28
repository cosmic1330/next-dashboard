import { isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
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
      <number>stockData[length - rollback_date]?.c >
        <number>stockData[length - (rollback_date + 1)]?.ma5 &&
      <number>stockData[length - rollback_date]?.c >
        <number>stockData[length - (rollback_date + 1)]?.h &&
      <number>stockData[length - rollback_date]?.c >
        <number>stockData[length - (rollback_date + 2)]?.l &&
      // EMA
      <number>stockData[length - rollback_date]?.ma5 >
        <number>stockData[length - rollback_date]?.ma20 &&
      <number>stockData[length - rollback_date]?.ma20 >
        <number>stockData[length - rollback_date]?.ma60 &&
      // MACD
      <number>stockData[length - rollback_date]?.macd >
        <number>stockData[length - (rollback_date + 1)]?.macd &&
      <number>stockData[length - rollback_date]?.osc >
        <number>stockData[length - (rollback_date + 1)]?.osc &&
      // KD 黃金交叉
      <number>stockData[length - rollback_date]?.k >
        <number>stockData[length - rollback_date]?.d &&
      <number>stockData[length - (rollback_date + 1)]?.k <
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
