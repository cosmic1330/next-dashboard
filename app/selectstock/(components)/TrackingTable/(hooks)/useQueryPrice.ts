import useTrackingFetchDeal from '@/app/selectstock/(hooks)/useTrackingFetchDeal';
import formatStockdata from '@/app/selectstock/(utils)/indicator/formatStockdata';
import { useMemo } from 'react';

import useNegativeAssessment from '@/app/selectstock/(hooks)/useNegativeAssessment';
import usePositiveAssessment from '@/app/selectstock/(hooks)/usePositiveAssessment';
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
import Williams18Generate from '@/app/selectstock/(utils)/indicator/classes/williams18';
import Williams8Generate from '@/app/selectstock/(utils)/indicator/classes/williams8';
import Ema5Generate from '@/app/selectstock/(utils)/indicator/classes/ema5';
import Ema10Generate from '@/app/selectstock/(utils)/indicator/classes/ema10';
import Ema20Generate from '@/app/selectstock/(utils)/indicator/classes/ema20';
import Rsi5Generate from '@/app/selectstock/(utils)/indicator/classes/rsi5';
import Rsi10Generate from '@/app/selectstock/(utils)/indicator/classes/rsi10';

export default function useQueryPrice(stock_id: string) {
  const fetchData = useTrackingFetchDeal(stock_id);

  const baseData = useMemo(() => {
    if (!fetchData) return [];
    return formatStockdata(fetchData, stock_id);
  }, [fetchData, stock_id]);

  const stockData = useMemo(
    () =>
      createSelectedIndicators(
        [
          Rsi5Generate,
          Rsi10Generate,
          Ema5Generate,
          Ema10Generate,
          Ema20Generate,
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
          Williams8Generate,
          Williams18Generate,
        ],
        baseData,
      ),
    [baseData],
  );

  const positives = usePositiveAssessment(stockData, 0);
  const negatives = useNegativeAssessment(stockData, 0);

  return { stockData, positives, negatives };
}
