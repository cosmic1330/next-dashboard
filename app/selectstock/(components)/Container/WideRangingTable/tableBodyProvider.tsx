'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import TableBodyRow from '@/app/selectstock/(layout)/tableBodyRow';
import useQueryDeal from './(hooks)/useQueryDeal';

export default function TableBodyRowProvider({
  stock,
}: {
  stock: V2StocksResponseRow;
}) {
  const { planData } = useQueryDeal(stock.stock_id);
  return (
    <TableBodyRow
      stock={stock}
      planData={planData}
      plan="Obv Long Plan"
    />
  );
}
