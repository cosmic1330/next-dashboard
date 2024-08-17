import { useMemo } from 'react';
import { StockData } from '../types';

import {
  isCloseAboveMa10,
  isCloseAboveMa20,
  isCloseAboveMa5,
  isKdGoldenCross,
  isKdPositiveTrend,
  isMa10PositiveTrend,
  isMa20PositiveTrend,
  isMa5PositiveTrend,
  isMacdMomentumBuildUp,
  isMacdPositiveDivergence,
  isMaPositiveOrder,
  isObvGoldenCross,
  isObvPositiveOrder,
  isPositiveEngulfing,
} from '@/app/selectstock/(utils)/assessment/positive';

export default function usePositiveAssessment(
  datas: StockData[],
  rollback_date: number,
) {
  const stringArray = useMemo(() => {
    const AssessmentArray = [
      isCloseAboveMa10,
      isCloseAboveMa20,
      isCloseAboveMa5,
      isKdGoldenCross,
      isKdPositiveTrend,
      isMa10PositiveTrend,
      isMa20PositiveTrend,
      isMa5PositiveTrend,
      isMacdMomentumBuildUp,
      isMacdPositiveDivergence,
      isMaPositiveOrder,
      isObvGoldenCross,
      isObvPositiveOrder,
      isPositiveEngulfing,
    ];
    const res = AssessmentArray.map((fn) => fn(datas, rollback_date)).filter(
      (item) => item !== false,
    );
    return res;
  }, [datas, rollback_date]);

  return stringArray;
}
