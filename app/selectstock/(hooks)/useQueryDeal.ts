import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import useNegativeAssessment from '@/app/selectstock/(hooks)/useNegativeAssessment';
import usePositiveAssessment from '@/app/selectstock/(hooks)/usePositiveAssessment';
import useSwrFetchDeal from '@/app/selectstock/(hooks)/useSwrFetchDeal';
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
import { ResGoldType } from '@/app/selectstock/types';
import { Gold } from '@ch20026103/anysis';
import { useContext, useMemo } from 'react';
import Williams14Generate from '../(utils)/indicator/classes/williams14';

export default function useQueryDeal(stock_id: string) {
  const { rollback_date } = useContext(SelectStockContext);
  const fetchData = useSwrFetchDeal(stock_id);
  const baseData = useMemo(() => {
    if (!fetchData) return [];
    return formatStockdata(fetchData, stock_id);
  }, [fetchData, stock_id]);

  const gold: ResGoldType = useMemo(() => {
    if (baseData.length === 0)
      return {
        superStrong: 0,
        strong: 0,
        middle: 0,
        weak: 0,
        superWeak: 0,
        highestPointDate: 0,
        highestPoint: 0,
        lowestPointDate: 0,
        lowestPoint: 0,
      };
    else {
      const cls = new Gold();
      return cls.getGold(baseData);
    }
  }, [baseData]);

  const stockData = useMemo(
    () =>
      createSelectedIndicators(
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
          Williams14Generate,
        ],
        baseData,
      ),
    [baseData],
  );

  const positives = usePositiveAssessment(stockData, rollback_date);
  const negatives = useNegativeAssessment(stockData, rollback_date);

  return { gold, stockData, positives, negatives, rollback_date };
}
