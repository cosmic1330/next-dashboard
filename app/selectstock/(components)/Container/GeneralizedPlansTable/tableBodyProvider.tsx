'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import useQueryDeal from '@/app/selectstock/(hooks)/useQueryDeal';
import TableBodyRow from '@/app/selectstock/(layout)/tableBodyRow';
import { Fragment } from 'react';
import useConform from './(hooks)/useConform';
import { GeneralizedPlans } from './types';

export default function TableBodyRowProvider({
  stock,
  plan,
}: {
  stock: V2StocksResponseRow;
  plan: GeneralizedPlans;
}) {
  const { stockData, positives, rollback_date, negatives, volume } =
    useQueryDeal(stock.stock_id);
  const conform = useConform(stockData, rollback_date, plan);
  return conform && stockData[stockData.length - 1]?.v > volume ? (
    <TableBodyRow
    {...{
      volume,
      stock,
      stockData,
      positives,
      negatives,
      conform,
      rollback_date,
    }}
    plan={`GeneralizedPlans_${plan}`}
    />
  ) : (
    <Fragment />
  );
}
