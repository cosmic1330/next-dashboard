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
import Williams14Generate from '@/app/selectstock/(utils)/indicator/classes/williams14';
import formatTaiexdata from '@/app/selectstock/(utils)/indicator/formatTaiexdata';
import { useMemo } from 'react';
import useSwrFetchTaiex from './useSwrFetchTaiex';

export default function useQueryTaiex() {
  const fetchData = useSwrFetchTaiex();
  const baseData = useMemo(() => {
    if (!fetchData) return [];
    return formatTaiexdata(fetchData);
  }, [fetchData]);

  const taiexData = useMemo(
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

  return taiexData;
}
