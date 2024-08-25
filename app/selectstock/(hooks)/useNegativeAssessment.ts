import { useMemo } from 'react';
import { StockData, TaxieData } from '../types';

import {
  isBreaksPreviousLowWithoutNewHigh,
  isCloseBelowMa10,
  isCloseBelowMa20,
  isCloseBelowMa5,
  isIncreasingVolumeGreenK,
  isKdDeathCross,
  isKdNegativeTrend,
  isLongGreenK,
  isMa10NegativeTrend,
  isMa20NegativeTrend,
  isMa5NegativeTrend,
  isMacdMomentumBuildDown,
  isMacdNegativeDivergence,
  isMaNegativeOrder,
  isNegativeEngulfing,
  isObvDeathCross,
  isObvNegativeOrder,
} from '@/app/selectstock/(utils)/assessment/negative';

export default function useNegativeAssessment(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  const stringArray = useMemo(() => {
    const AssessmentArray = [
      isCloseBelowMa10,
      isCloseBelowMa20,
      isCloseBelowMa5,
      isKdDeathCross,
      isKdNegativeTrend,
      isMa10NegativeTrend,
      isMa20NegativeTrend,
      isMa5NegativeTrend,
      isMacdMomentumBuildDown,
      isMacdNegativeDivergence,
      isMaNegativeOrder,
      isNegativeEngulfing,
      isObvDeathCross,
      isObvNegativeOrder,
      isBreaksPreviousLowWithoutNewHigh,
      isIncreasingVolumeGreenK,
      isLongGreenK,
    ];
    const res = AssessmentArray.map((fn) => fn(datas, rollback_date)).filter(
      (item) => item !== false,
    );
    return res as string[];
  }, [datas, rollback_date]);

  return stringArray;
}
