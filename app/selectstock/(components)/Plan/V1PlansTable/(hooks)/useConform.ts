import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';
import { V1Plans } from '../types';
import breakpressure from './plans/breakpressure';
import forward from './plans/forward';
import obvlong from './plans/obvlong';
import tworedsoldier from './plans/tworedsoldier';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
  plan: V1Plans,
) {
  const conform = useMemo(() => {
    return (
      (plan === V1Plans.Forward && forward(stockData, rollback_date)) ||
      (plan === V1Plans.ObvLong && obvlong(stockData, rollback_date)) ||
      (plan === V1Plans.BreakPressure &&
        breakpressure(stockData, rollback_date)) ||
      (plan === V1Plans.TwoRedSoldier && tworedsoldier(stockData, rollback_date))
    );
  }, [plan, rollback_date, stockData]);

  return conform;
}
