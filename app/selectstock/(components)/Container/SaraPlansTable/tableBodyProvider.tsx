'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import useQueryDeal from '@/app/selectstock/(hooks)/useQueryDeal';
import TableBodyRow from '@/app/selectstock/(layout)/tableBodyRow';
import { Fragment } from 'react';
import useConform from './(hooks)/useConform';
import { SaraPlans } from './types';

export default function TableBodyRowProvider({
  stock,
  plan,
}: {
  stock: V2StocksResponseRow;
  plan: SaraPlans;
}) {
  const { stockData, positives, rollback_date, negatives } = useQueryDeal(
    stock.stock_id,
  );
  const conform = useConform(stockData, rollback_date, plan);
  return !conform ? (
    <Fragment />
  ) : (
    <TableBodyRow
      {...{
        stock,
        stockData,
        positives,
        negatives,
        conform,
        rollback_date,
      }}
      plan={`SaraPlans_${plan}`}
    />
  );
}
