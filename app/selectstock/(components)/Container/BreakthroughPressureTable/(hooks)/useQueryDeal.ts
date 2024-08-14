import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import useSwrFetchDeal from '@/app/selectstock/(hooks)/useSwrFetchDeal';
import { isMovingAverageTrendUp, isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { createSelectedIndicators } from '@/app/selectstock/(utils)/indicator';
import BollGenerate from '@/app/selectstock/(utils)/indicator/classes/boll';
import KdGenerate from '@/app/selectstock/(utils)/indicator/classes/kd';
import Ma10Generate from '@/app/selectstock/(utils)/indicator/classes/ma10';
import Ma120Generate from '@/app/selectstock/(utils)/indicator/classes/ma120';
import Ma20Generate from '@/app/selectstock/(utils)/indicator/classes/ma20';
import Ma240Generate from '@/app/selectstock/(utils)/indicator/classes/ma240';
import Ma5Generate from '@/app/selectstock/(utils)/indicator/classes/ma5';
import Ma60Generate from '@/app/selectstock/(utils)/indicator/classes/ma60';
import MacdGenerate from '@/app/selectstock/(utils)/indicator/classes/macd';
import Obv10Generate from '@/app/selectstock/(utils)/indicator/classes/obv10';
import Obv5Generate from '@/app/selectstock/(utils)/indicator/classes/obv5';
import formatStockdata from '@/app/selectstock/(utils)/indicator/formatStockdata';
import { Gold } from '@ch20026103/anysis';
import { useCallback, useContext, useMemo } from 'react';

export default function useQueryDeal(stock_id: string) {
  const { rollback_date } = useContext(SelectStockContext);
  const data = useSwrFetchDeal(stock_id);

  const method = useCallback(
    (rollback_date: number) => {
      if (!data) return;

      try {
        const stockData = formatStockdata(data, stock_id);
        const gold = new Gold();
        const allGold = gold.getGold(stockData);
        let length = stockData.length - 1;
        const finallyData = createSelectedIndicators(
          [
            Ma5Generate,
            Ma10Generate,
            Ma20Generate,
            Ma60Generate,
            Ma120Generate,
            Ma240Generate,
            MacdGenerate,
            Obv5Generate,
            Obv10Generate,
            KdGenerate,
            BollGenerate,
          ],
          stockData,
        );
        if (
          isSufficientTradingVolume(finallyData, rollback_date, 500) &&
          stockData[length - rollback_date].c >
            <number>finallyData[length - rollback_date].ma5 &&
          stockData[length - rollback_date].l >
            <number>finallyData[length - rollback_date].ma5 &&
          // 5日均線往上突破10日、20日或60日均線
          <number>finallyData[length - rollback_date].ma5 >
            <number>finallyData[length - rollback_date].ma10 &&
          <number>finallyData[length - (rollback_date + 1)].ma5 <
            <number>finallyData[length - (rollback_date + 1)].ma10 &&
          <number>finallyData[length - (rollback_date + 2)].ma5 <
            <number>finallyData[length - (rollback_date + 2)].ma10 &&
          <number>finallyData[length - (rollback_date + 1)].ma10 -
            <number>finallyData[length - (rollback_date + 1)].ma5 <
            <number>finallyData[length - (rollback_date + 2)].ma10 -
              <number>finallyData[length - (rollback_date + 2)].ma5 &&
          ((<number>finallyData[length - (rollback_date + 1)].ma10 -
            <number>finallyData[length - (rollback_date + 1)].ma5) /
            <number>finallyData[length - (rollback_date + 1)].ma5) *
            100 <
            2 &&
          // (<number>finallyData[length - rollback_date].ma5 >
          //   <number>finallyData[length - rollback_date].ma20 &&
          //   <number>finallyData[length - (rollback_date + 1)].ma5 <
          //     <number>finallyData[length - (rollback_date + 1)].ma20 &&
          //   <number>finallyData[length - (rollback_date + 2)].ma5 <
          //   <number>finallyData[length - (rollback_date + 2)].ma20 &&
          //   <number>finallyData[length -  (rollback_date + 1)].ma20 -
          //     <number>finallyData[length -  (rollback_date + 1)].ma5 <
          //     <number>finallyData[length - (rollback_date + 2)].ma20 -
          //       <number>finallyData[length - (rollback_date + 2)].ma5 &&
          //   ((<number>finallyData[length -  (rollback_date + 1)].ma20 -
          //     <number>finallyData[length -  (rollback_date + 1)].ma5) /
          //     <number>finallyData[length -  (rollback_date + 1)].ma5) *
          //     100 <
          //     2) || (<number>finallyData[length - rollback_date].ma5 >
          //       <number>finallyData[length - rollback_date].ma60 &&
          //       <number>finallyData[length - (rollback_date + 1)].ma5 <
          //         <number>finallyData[length - (rollback_date + 1)].ma60 &&
          //       <number>finallyData[length - (rollback_date + 2)].ma5 <
          //       <number>finallyData[length - (rollback_date + 2)].ma60 &&
          //       <number>finallyData[length -  (rollback_date + 1)].ma60 -
          //         <number>finallyData[length -  (rollback_date + 1)].ma5 <
          //         <number>finallyData[length - (rollback_date + 2)].ma60 -
          //           <number>finallyData[length - (rollback_date + 2)].ma5 &&
          //       ((<number>finallyData[length -  (rollback_date + 1)].ma60 -
          //         <number>finallyData[length -  (rollback_date + 1)].ma5) /
          //         <number>finallyData[length -  (rollback_date + 1)].ma5) *
          //         100 <
          //         2)
          // 月線往上
          isMovingAverageTrendUp(finallyData, rollback_date, MaType.MA20) &&
          // 季線往上
          isMovingAverageTrendUp(finallyData, rollback_date, MaType.MA60) &&
          // 五日均線往上
          <number>finallyData[length - rollback_date].ma5 >
            <number>finallyData[length - (rollback_date + 1)].ma5 &&
          // rsv
          <number>finallyData[length - rollback_date].rsv >
            <number>finallyData[length - (rollback_date + 1)].rsv &&
          <number>finallyData[length - rollback_date].rsv < 75 &&
          <number>finallyData[length - rollback_date].rsv > 30
        ) {
          return {
            ...finallyData[length - rollback_date],
            pre: [
              finallyData[length - (rollback_date + 1)],
              finallyData[length - (rollback_date + 2)],
            ],
            ...allGold,
          };
        }
        return null;
      } catch (e) {
        console.log(stock_id, e);
      }
    },
    [data, stock_id],
  );

  const planData = useMemo(() => {
    return method(rollback_date);
  }, [method, rollback_date]);

  return { planData };
}
