'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import useQueryDeal from '@/app/selectstock/(hooks)/useQueryDeal';
import TableBodyRow from '@/app/selectstock/(layout)/tableBodyRow';
import useConform from './(hooks)/useConform';
import { Fragment } from 'react';

export default function TableBodyRowProvider({
  stock,
}: {
  stock: V2StocksResponseRow;
}) {
  const { gold, stockData, positives, rollback_date, negatives } = useQueryDeal(
    stock.stock_id,
  );
  const conform = useConform(stockData, rollback_date);
  if (!conform) return <Fragment />;
  return (
    <TableBodyRow
      {...{
        stock,
        gold,
        stockData,
        positives,
        negatives,
        conform,
        rollback_date,
      }}
      plan="Kd Golden Cross Plan"
    />
  );
}
