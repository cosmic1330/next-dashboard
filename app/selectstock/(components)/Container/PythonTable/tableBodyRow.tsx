'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import { useTrackingList } from '@/store/zustand';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { IconButton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Fragment } from 'react';
import useQueryDeal from './(hooks)/useQueryDeal';

export default function TableBodyRow({
  stock,
}: {
  stock: V2StocksResponseRow;
}) {
  const { planData } = useQueryDeal(stock.stock_id);
  const { add } = useTrackingList();
  const handleAdd = () => {
    add({
      id: stock.stock_id,
      date: planData?.t || 0,
      plan: 'Python Plan',
      name: stock.stock_name,
      c: planData?.c || 0,
    });
  };
  if (!planData) return <Fragment />;
  return (
    <TableRow key={stock.stock_name} hover>
      <TableCell component="th" scope="row">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`https://www.wantgoo.com/stock/${stock.stock_id}/major-investors/main-trend#main-trend`}
        >
          {planData.t}
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
      <TableCell align="center">{planData.c}</TableCell>
      <TableCell align="center">
        <IconButton color="success" onClick={handleAdd}>
          <NoteAddOutlinedIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Typography align="left">
          {planData.ma5 > planData.ma10 &&
            planData.ma10 > planData.ma20 &&
            '正向排列'}
        </Typography>
        <Typography align="left">
          {planData.c > planData.ma20 && '月線之上'}
        </Typography>
        <Typography align="left">
          {planData.c > planData.ma5 && '五均之上'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="left">超強勢 : {planData['superStrong']}</Typography>
        <Typography align="left">---強勢 : {planData['strong']}</Typography>
        <Typography align="left">---中度 : {planData['middle']}</Typography>
        <Typography align="left">---弱勢 : {planData['weak']}</Typography>
        <Typography align="left">超弱勢 : {planData['superWeak']}</Typography>
        <Typography align="left">
          前高:{planData['highestPointDate']} {planData['highestPoint']}
        </Typography>
        <Typography align="left">
          前低:{planData['lowestPointDate']} {planData['lowestPoint']}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="left">
          外資: {planData['foreign_investors'] || 0}
        </Typography>
        <Typography align="left">
          投信: {planData['investment_trust'] || 0}
        </Typography>
        <Typography align="left">自營: {planData['dealer'] || 0}</Typography>
      </TableCell>
    </TableRow>
  );
}
