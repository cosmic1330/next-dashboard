import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';
import { GoLongAgainstTrendPlans } from '../types';
import williamsnegativetrend from './plans/williamsnegativetrend';
import downturninuptrendma5 from './plans/downturninuptrendma5';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
  plan: GoLongAgainstTrendPlans,
) {
  const conform = useMemo(() => {
    return (
      (plan === GoLongAgainstTrendPlans.WilliamsNegativeTrend &&
        williamsnegativetrend(stockData, rollback_date)) ||
      (plan === GoLongAgainstTrendPlans.DownturnInUptrendMa5 &&
        downturninuptrendma5(stockData, rollback_date))
    );
  }, [plan, rollback_date, stockData]);

  return conform;
}
