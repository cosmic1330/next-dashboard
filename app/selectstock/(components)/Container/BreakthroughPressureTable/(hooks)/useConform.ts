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
      isSufficientTradingVolume(stockData, rollback_date, 500) &&
      stockData[length - rollback_date].c >
        <number>stockData[length - rollback_date].ma5 &&
      stockData[length - rollback_date].l >
        <number>stockData[length - rollback_date].ma5 &&
      // 5日均線往上突破10日、20日或60日均線
      <number>stockData[length - rollback_date].ma5 >
        <number>stockData[length - rollback_date].ma10 &&
      <number>stockData[length - (rollback_date + 1)].ma5 <
        <number>stockData[length - (rollback_date + 1)].ma10 &&
      <number>stockData[length - (rollback_date + 2)].ma5 <
        <number>stockData[length - (rollback_date + 2)].ma10 &&
      <number>stockData[length - (rollback_date + 1)].ma10 -
        <number>stockData[length - (rollback_date + 1)].ma5 <
        <number>stockData[length - (rollback_date + 2)].ma10 -
          <number>stockData[length - (rollback_date + 2)].ma5 &&
      ((<number>stockData[length - (rollback_date + 1)].ma10 -
        <number>stockData[length - (rollback_date + 1)].ma5) /
        <number>stockData[length - (rollback_date + 1)].ma5) *
        100 <
        2 &&
      // (<number>stockData[length - rollback_date].ma5 >
      //   <number>stockData[length - rollback_date].ma20 &&
      //   <number>stockData[length - (rollback_date + 1)].ma5 <
      //     <number>stockData[length - (rollback_date + 1)].ma20 &&
      //   <number>stockData[length - (rollback_date + 2)].ma5 <
      //   <number>stockData[length - (rollback_date + 2)].ma20 &&
      //   <number>stockData[length -  (rollback_date + 1)].ma20 -
      //     <number>stockData[length -  (rollback_date + 1)].ma5 <
      //     <number>stockData[length - (rollback_date + 2)].ma20 -
      //       <number>stockData[length - (rollback_date + 2)].ma5 &&
      //   ((<number>stockData[length -  (rollback_date + 1)].ma20 -
      //     <number>stockData[length -  (rollback_date + 1)].ma5) /
      //     <number>stockData[length -  (rollback_date + 1)].ma5) *
      //     100 <
      //     2) || (<number>stockData[length - rollback_date].ma5 >
      //       <number>stockData[length - rollback_date].ma60 &&
      //       <number>stockData[length - (rollback_date + 1)].ma5 <
      //         <number>stockData[length - (rollback_date + 1)].ma60 &&
      //       <number>stockData[length - (rollback_date + 2)].ma5 <
      //       <number>stockData[length - (rollback_date + 2)].ma60 &&
      //       <number>stockData[length -  (rollback_date + 1)].ma60 -
      //         <number>stockData[length -  (rollback_date + 1)].ma5 <
      //         <number>stockData[length - (rollback_date + 2)].ma60 -
      //           <number>stockData[length - (rollback_date + 2)].ma5 &&
      //       ((<number>stockData[length -  (rollback_date + 1)].ma60 -
      //         <number>stockData[length -  (rollback_date + 1)].ma5) /
      //         <number>stockData[length -  (rollback_date + 1)].ma5) *
      //         100 <
      //         2)
      // 月線往上
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20) &&
      // 季線往上
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA60) &&
      // 五日均線往上
      <number>stockData[length - rollback_date].ma5 >
        <number>stockData[length - (rollback_date + 1)].ma5 &&
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
