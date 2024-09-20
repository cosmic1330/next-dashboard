import { useMemo } from 'react';

import { isSufficientTradingVolume } from '@/app/selectstock/(utils)/conditions';
import { StockData } from '@/app/selectstock/types';

export default function useConform(
  stockData: StockData[],
  rollback_date: number,
) {
  const conform = useMemo(() => {
    let length = stockData.length - 1;
    const indices = [
      length - (rollback_date + 1),
      length - (rollback_date + 2),
      length - (rollback_date + 3),
    ];
    if (indices.some((index) => index < 0 || index >= stockData.length)) {
      return false;
    }
    const current = length - rollback_date;
    const h = Math.max(...indices.map((index) => stockData[index].h));

    if (
      isSufficientTradingVolume(stockData, rollback_date, 300) &&
      (<number>stockData[current]?.williams8 === -100 ||
        <number>stockData[current]?.williams18 === -100) &&
      h > stockData[current].l &&
      Math.abs(((h - stockData[current].l) / stockData[current].l) * 100) > 10
    ) {
      return true;
    }
    return false;
  }, [rollback_date, stockData]);

  return conform;
}
