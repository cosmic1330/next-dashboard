import {
  BreakResistanceAverageLine,
  isBearishEngulfing,
  isKbarSmallDeviationFromMA,
  isKDGoldenCross,
  isMacdGoldenCross,
  isMacdPositiveWithDecreasingGreenBars,
  isMaSlopePositive,
  isMovingAveragesConverging,
  isMovingAveragesPositiveOrder,
  isMovingAverageTrendUp,
  isNoBreakBelowBullishCandleMidpoint,
  isObvGoldenCross,
  isObvPositiveOrder,
  isOscHistogramTurningPositive,
  isPriceDroppedAndRecoveredAboveMA,
  isSufficientTradingVolume,
  isMutiConsecutiveDaysAboveMovingAverage,
  isTwoRedSoldiersHigherLows,
} from '@/app/selectstock/(utils)/conditions';
import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    let count = 0;
    [
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA5),
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA10),
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA20),
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA60),
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA120),
      isMovingAverageTrendUp(stockData, rollback_date, MaType.MA240),
      isMovingAveragesPositiveOrder(stockData, rollback_date, [
        MaType.MA5,
        MaType.MA10,
        MaType.MA20,
      ]),
      isSufficientTradingVolume(stockData, rollback_date, 300),
      isKbarSmallDeviationFromMA(stockData, rollback_date, MaType.MA5),
      isKDGoldenCross(stockData, rollback_date),
      isTwoRedSoldiersHigherLows(stockData, rollback_date),
      isObvPositiveOrder(stockData, rollback_date),
      isObvGoldenCross(stockData, rollback_date),
      isBearishEngulfing(stockData, rollback_date),
      isMacdGoldenCross(stockData, rollback_date),
      isOscHistogramTurningPositive(stockData, rollback_date),
      isMacdPositiveWithDecreasingGreenBars(stockData, rollback_date),
      isPriceDroppedAndRecoveredAboveMA(stockData, rollback_date, MaType.MA5),
      isPriceDroppedAndRecoveredAboveMA(stockData, rollback_date, MaType.MA10),
      isPriceDroppedAndRecoveredAboveMA(stockData, rollback_date, MaType.MA20),
      isPriceDroppedAndRecoveredAboveMA(stockData, rollback_date, MaType.MA60),
      BreakResistanceAverageLine(stockData, rollback_date),
      isMovingAveragesConverging(stockData, rollback_date),
      isMutiConsecutiveDaysAboveMovingAverage(
        stockData,
        rollback_date,
        MaType.MA5,
      ),
      isMutiConsecutiveDaysAboveMovingAverage(
        stockData,
        rollback_date,
        MaType.MA10,
      ),
      isMutiConsecutiveDaysAboveMovingAverage(
        stockData,
        rollback_date,
        MaType.MA20,
      ),
      isMaSlopePositive(stockData, rollback_date, MaType.MA5),
      isNoBreakBelowBullishCandleMidpoint(stockData, rollback_date),
    ].forEach((item) => {
      if (item) count++;
    });
    return count;
  }, [rollback_date, stockData]);

  return conform;
}
