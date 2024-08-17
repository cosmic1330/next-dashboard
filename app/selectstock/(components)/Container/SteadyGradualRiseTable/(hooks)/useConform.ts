import { isSlowStepwiseIncrease } from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';
import { useMemo } from 'react';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (isSlowStepwiseIncrease(stockData, rollback_date)) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
