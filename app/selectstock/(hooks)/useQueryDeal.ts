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
import { useContext, useMemo } from 'react';
import williams8Generate from '../(utils)/indicator/classes/williams8';
import Ema5Generate from '../(utils)/indicator/classes/ema5';
import Ema10Generate from '../(utils)/indicator/classes/ema10';
import Ema20Generate from '../(utils)/indicator/classes/ema20';

export default function useQueryDeal(stock_id: string) {
  const { rollback_date, volume } = useContext(SelectStockContext);
  const fetchData = useSwrFetchDeal(stock_id);
  const baseData = useMemo(() => {
    if (!fetchData) return [];
    return formatStockdata(fetchData, stock_id);
  }, [fetchData, stock_id]);

  const stockData = useMemo(
    () =>
      createSelectedIndicators(
        [
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
          williams8Generate,
        ],
        baseData,
      ),
    [baseData],
  );

  const positives = usePositiveAssessment(stockData, rollback_date);
  const negatives = useNegativeAssessment(stockData, rollback_date);

  return { stockData, positives, negatives, rollback_date, volume };
}
