import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';
import { V2Plans } from '../types';
import backsupportline from './plans/backsupportline';
import steadygradualrise from './plans/steadygradualrise';
import tworedsoldier from './plans/tworedsoldier';
import bullishcrossover from './plans/bullishcrossover';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
  plan: V2Plans,
) {
  const conform = useMemo(() => {
    return (
      (plan === V2Plans.BackSupportLine &&
        backsupportline(stockData, rollback_date)) ||
      (plan === V2Plans.BullishCrossover &&
        bullishcrossover(stockData, rollback_date)) ||
      (plan === V2Plans.TwoRedSoldier &&
        tworedsoldier(stockData, rollback_date)) ||
      (plan === V2Plans.SteadyGradualRise &&
        steadygradualrise(stockData, rollback_date))
    );
  }, [plan, rollback_date, stockData]);

  return conform;
}
