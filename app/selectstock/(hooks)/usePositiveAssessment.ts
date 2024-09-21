import { useMemo } from 'react';
import { StockData, TaxieData } from '../types';

import {
  isCloseAboveMa10,
  isCloseAboveMa20,
  isCloseAboveMa5,
  isHoldsPreviousLowAndMakesNewHigh,
  isIncreasingVolumeRedK,
  isKdGoldenCross,
  isKdPositiveTrend,
  isLongRedK,
  isLowerAboveMa10,
  isLowerAboveMa20,
  isLowerAboveMa5,
  isMa10PositiveTrend,
  isMa20PositiveTrend,
  isMa5PositiveTrend,
  isMacdMomentumBuildUp,
  isMacdNegativeDivergence,
  isMaPositiveOrder,
  isObvRisingHighs,
  isObvRisingLows,
  isPositiveEngulfing,
  isRsiGoldenCross,
  isRsiPositiveTrend,
  isWilliams8PositiveTrend,
  isKdNegativeDivergence,
  isOscContractionSignalsBottoming,
} from '@/app/selectstock/(utils)/assessment/positive';

export default function usePositiveAssessment(
  datas: StockData[] | TaxieData[],
  rollback_date: number,
) {
  const stringArray = useMemo(() => {
    const AssessmentArray = [
      isKdNegativeDivergence,
      isOscContractionSignalsBottoming,
      isObvRisingLows,
      isObvRisingHighs,
      isRsiGoldenCross,
      isRsiPositiveTrend,
      isLowerAboveMa10,
      isLowerAboveMa20,
      isLowerAboveMa5,
      isCloseAboveMa10,
      isCloseAboveMa20,
      isCloseAboveMa5,
      isKdGoldenCross,
      isKdPositiveTrend,
      isMa10PositiveTrend,
      isMa20PositiveTrend,
      isMa5PositiveTrend,
      isMacdMomentumBuildUp,
      isMacdNegativeDivergence,
      isMaPositiveOrder,
      isPositiveEngulfing,
      isHoldsPreviousLowAndMakesNewHigh,
      isIncreasingVolumeRedK,
      isLongRedK,
      isWilliams8PositiveTrend,
    ];
    const res = AssessmentArray.map((fn) => fn(datas, rollback_date)).filter(
      (item) => item !== false,
    );
    return res as string[];
  }, [datas, rollback_date]);

  return stringArray;
}
