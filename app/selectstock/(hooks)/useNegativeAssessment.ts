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
  isKdPositiveDivergence,
  isKdTurnBearish,
  isLongGreenK,
  isMa10NegativeTrend,
  isMa20NegativeTrend,
  isMa5NegativeTrend,
  isMacdInBearishZone,
  isMacdMomentumBuildDown,
  isMacdPositiveDivergence,
  isMaNegativeOrder,
  isNegativeEngulfing,
  isObvFallingHighs,
  isObvFallingLows,
  isObvNegativeOrder,
  isOscContractionSignalsTopping,
  isRsiDeathCross,
  isRsiNegativeTrend,
  isWilliams8NegativeTrend,
} from '@/app/selectstock/(utils)/assessment/negative';

export default function useNegativeAssessment(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  const stringArray = useMemo(() => {
    const AssessmentArray = [
      isMacdInBearishZone,
      isKdPositiveDivergence,
      isOscContractionSignalsTopping,
      isObvFallingHighs,
      isObvFallingLows,
      isRsiDeathCross,
      isRsiNegativeTrend,
      isCloseBelowMa10,
      isCloseBelowMa20,
      isCloseBelowMa5,
      isKdTurnBearish,
      isKdDeathCross,
      isKdNegativeTrend,
      isMa10NegativeTrend,
      isMa20NegativeTrend,
      isMa5NegativeTrend,
      isMacdMomentumBuildDown,
      isMacdPositiveDivergence,
      isMaNegativeOrder,
      isNegativeEngulfing,
      isObvNegativeOrder,
      isBreaksPreviousLowWithoutNewHigh,
      isIncreasingVolumeGreenK,
      isLongGreenK,
      isWilliams8NegativeTrend,
    ];
    const res = AssessmentArray.map((fn) => fn(datas, rollback_date)).filter(
      (item) => item !== false,
    );
    return res as string[];
  }, [datas, rollback_date]);

  return stringArray;
}
