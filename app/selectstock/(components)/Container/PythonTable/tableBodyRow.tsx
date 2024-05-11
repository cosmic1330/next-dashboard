'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Fragment } from 'react';
import useQueryDeal from './(hooks)/useQueryDeal';

export default function TableBodyRow({
  stock,
  index,
}: {
  stock: V2StocksResponseRow;
  index: number;
}) {
  const { macdBytPlan } = useQueryDeal(stock.stock_id);
  if (!macdBytPlan) return <Fragment />;
  return (
    <TableRow key={stock.stock_name} hover>
      <TableCell component="th" scope="row">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`https://www.wantgoo.com/stock/${stock.stock_id}/major-investors/main-trend#main-trend`}
        >
          {index + 1}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${stock.stock_id}.html`}
        >
          {stock.stock_name}
        </Link>{' '}
        (
        <Link
          target="_blank"
          rel="noreferrer"
          href={`https://tw.stock.yahoo.com/q/ta?s=${stock.stock_id}`}
        >
          {stock.stock_id}
        </Link>
        )
      </TableCell>
      <TableCell align="center">{macdBytPlan.c}</TableCell>
      <TableCell align="center">WIP</TableCell>
      <TableCell align="center">
        <Typography align="left">
          {macdBytPlan.ma5 > macdBytPlan.ma10 &&
            macdBytPlan.ma10 > macdBytPlan.ma20 &&
            '正向排列'}
        </Typography>
        <Typography align="left">
          {macdBytPlan.c > macdBytPlan.ma20 && '月線之上'}
        </Typography>
        <Typography align="left">
          {macdBytPlan.c > macdBytPlan.ma5 && '五均之上'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="left">
          超強勢 : {macdBytPlan['superStrong']}
        </Typography>
        <Typography align="left">---強勢 : {macdBytPlan['strong']}</Typography>
        <Typography align="left">---中度 : {macdBytPlan['middle']}</Typography>
        <Typography align="left">---弱勢 : {macdBytPlan['weak']}</Typography>
        <Typography align="left">
          超弱勢 : {macdBytPlan['superWeak']}
        </Typography>
        <Typography align="left">前高:{macdBytPlan['highestPoint']}</Typography>
        <Typography align="left">前低:{macdBytPlan['lowestPoint']}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="left">
          外資: {macdBytPlan['foreign_investors'] || 0}
        </Typography>
        <Typography align="left">
          投信: {macdBytPlan['investment_trust'] || 0}
        </Typography>
        <Typography align="left">自營: {macdBytPlan['dealer'] || 0}</Typography>
      </TableCell>
    </TableRow>
  );
}
