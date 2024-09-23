import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';
import { SaraPlans } from '../types';
import goldplatedsilver from './plans/goldplatedsilver';
import bullishpolevault from './plans/bullishpolevault';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
  plan: SaraPlans,
) {
  const conform = useMemo(() => {
    return (
      (plan === SaraPlans.GoldPlatedSilverTable &&
        goldplatedsilver(stockData, rollback_date)) ||
      (plan === SaraPlans.BullishPoleVault  &&
        bullishpolevault(stockData, rollback_date))
    );
  }, [plan, rollback_date, stockData]);

  return conform;
}
