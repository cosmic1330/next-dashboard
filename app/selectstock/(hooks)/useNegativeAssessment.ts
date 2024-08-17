import { useMemo } from 'react';
import { StockData } from '../types';

import {
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
} from '@/app/selectstock/(utils)/assessment/negative';

export default function useNegativeAssessment(
  datas: StockData[],
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
    ];
    const res = AssessmentArray.map((fn) => fn(datas, rollback_date)).filter(
      (item) => item !== false,
    );
    return res;
  }, [datas, rollback_date]);

  return stringArray;
}
