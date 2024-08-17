import {
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
      isSufficientTradingVolume(stockData, rollback_date, 500) &&
      stockData[length - rollback_date].c >
        <number>stockData[length - rollback_date].ma5 &&
      stockData[length - (rollback_date + 1)].c >
        <number>stockData[length - (rollback_date + 1)].ma5 &&
      (stockData[length - rollback_date].c >
        <number>stockData[length - rollback_date].bollUb ||
        stockData[length - rollback_date].h >
          <number>stockData[length - rollback_date].bollUb) &&
      stockData[length - rollback_date].l >
        <number>stockData[length - rollback_date].ma5 &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
      ]) &&
      // 五日均線往上
      <number>stockData[length - rollback_date].ma5 >
        <number>stockData[length - (rollback_date + 1)].ma5 &&
      // KD 往上
      <number>stockData[length - rollback_date].k >
        <number>stockData[length - rollback_date].d &&
      <number>stockData[length - rollback_date].k >
        <number>stockData[length - (rollback_date + 1)].k &&
      <number>stockData[length - rollback_date].rsv >
        <number>stockData[length - (rollback_date + 1)].rsv &&
      // macd 動能增加
      <number>stockData[length - rollback_date].osc >
        <number>stockData[length - (rollback_date + 1)].osc &&
      // 布林開口
      <number>stockData[length - rollback_date].bollUb >
        <number>stockData[length - (rollback_date + 1)].bollUb &&
      <number>stockData[length - rollback_date].bollLb <
        <number>stockData[length - (rollback_date + 1)].bollLb &&
      // 漲幅小於6%
      ((<number>stockData[length - rollback_date].c -
        <number>stockData[length - (rollback_date + 1)].c) /
        <number>stockData[length - (rollback_date + 1)].c) *
        100 <
        6 &&
      // K棒未跳高
      ((<number>stockData[length - rollback_date].l -
        <number>stockData[length - rollback_date].ma5) /
        <number>stockData[length - rollback_date].ma5) *
        100 <
        1 &&
      ((<number>stockData[length - rollback_date].l -
        <number>stockData[length - (rollback_date + 1)].ma5) /
        <number>stockData[length - (rollback_date + 1)].ma5) *
        100 <
        1
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
