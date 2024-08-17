import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import useNegativeAssessment from '@/app/selectstock/(hooks)/useNegativeAssessment';
import usePositiveAssessment from '@/app/selectstock/(hooks)/usePositiveAssessment';
import useSwrFetchDeal from '@/app/selectstock/(hooks)/useSwrFetchDeal';
import {
  isMovingAveragesPositiveOrder,
  isPriceDroppedAndRecoveredAboveMA,
  isSufficientTradingVolume,
} from '@/app/selectstock/(utils)/conditions';
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
import { ResGoldType, StockData } from '@/app/selectstock/types';
import { Gold } from '@ch20026103/anysis';
import { useContext, useMemo } from 'react';

export default function useConform(stockData: StockData[], rollback_date: number) {
  const conform = useMemo(() => {
    if (
      // 股價下跌不跌破均線
      isSufficientTradingVolume(stockData, rollback_date, 1000) &&
      // 均線正向排列
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
      ]) &&
      (isPriceDroppedAndRecoveredAboveMA(
        stockData,
        rollback_date,
        MaType.MA5,
      ) ||
        isPriceDroppedAndRecoveredAboveMA(
          stockData,
          rollback_date,
          MaType.MA10,
        ) ||
        isPriceDroppedAndRecoveredAboveMA(
          stockData,
          rollback_date,
          MaType.MA20,
        ))
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);


  return conform;
}
