import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';
import { GeneralizedPlans } from '../types';
import belowma20 from './plans/belowma20';
import goldencross from './plans/goldencross';
import tworedsoldier from './plans/tworedsoldier';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
  plan: GeneralizedPlans,
) {
  const conform = useMemo(() => {
    return (
      (plan === GeneralizedPlans.GoldenCross &&
        goldencross(stockData, rollback_date)) ||
      (plan === GeneralizedPlans.BelowMa20 &&
        belowma20(stockData, rollback_date)) ||
      (plan === GeneralizedPlans.TwoRedSoldier &&
        tworedsoldier(stockData, rollback_date))
    );
  }, [plan, rollback_date, stockData]);

  return conform;
}
