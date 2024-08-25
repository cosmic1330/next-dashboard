import { isGoldPlatedSilver } from '@/app/selectstock/(utils)/conditions';
import { useMemo } from 'react';

import { MaType } from '@/app/selectstock/(utils)/conditions/types';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    if (
      isGoldPlatedSilver(stockData, rollback_date, MaType.MA120, MaType.MA20) ||
      isGoldPlatedSilver(stockData, rollback_date, MaType.MA240, MaType.MA20) ||
      isGoldPlatedSilver(stockData, rollback_date, MaType.MA120, MaType.MA60) ||
      isGoldPlatedSilver(stockData, rollback_date, MaType.MA240, MaType.MA60)
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
