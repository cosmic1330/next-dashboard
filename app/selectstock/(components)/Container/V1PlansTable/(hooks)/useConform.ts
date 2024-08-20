import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';
import { Plans } from '../types';
import breakpressure from './plans/breakpressure';
import forward from './plans/forward';
import obvlong from './plans/obvlong';
import tworedsoldier from './plans/tworedsoldier';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
  plan: Plans,
) {
  const conform = useMemo(() => {
    return (
      (plan === Plans.Forward && forward(stockData, rollback_date)) ||
      (plan === Plans.ObvLong && obvlong(stockData, rollback_date)) ||
      (plan === Plans.BreakPressure &&
        breakpressure(stockData, rollback_date)) ||
      (plan === Plans.TwoRedSoldier && tworedsoldier(stockData, rollback_date))
    );
  }, [plan, rollback_date, stockData]);

  return conform;
}
