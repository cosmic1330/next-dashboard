'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import { useTrackingList } from '@/store/zustand';
import NorthIcon from '@mui/icons-material/North';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SouthIcon from '@mui/icons-material/South';
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
      plan: 'Two Red Soldier Plan',
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
        <Typography align="center">
          {stock && planData.c > planData.pre[0].c && (
            <NorthIcon fontSize="small" sx={{ color: 'red' }} />
          )}
          {stock && planData.c < planData.pre[0].c && (
            <SouthIcon fontSize="small" sx={{ color: 'green' }} />
          )}
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
        </Typography>
        <Typography align="center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={` https://tw.tradingview.com/chart/8TP8jY00/?symbol=TWSE%3A${stock.stock_id}`}
          >
            {Math.round(
              ((planData.c - planData.pre[0].c) / planData.pre[0].c) *
                100 *
                100,
            ) / 100}
            %
          </Link>
        </Typography>
      </TableCell>
      <TableCell align="center">{planData.c}</TableCell>
      <TableCell align="center">
        <IconButton color="success" onClick={handleAdd}>
          <NoteAddOutlinedIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Typography align="center" color="success.main">
          {planData.ma5 > planData.ma10 &&
            planData.ma10 > planData.ma20 &&
            '正向排列'}
        </Typography>
        <Typography align="center" color="success.main">
          {planData.c > planData.ma20 && '月線之上'}
        </Typography>
        <Typography align="center" color="success.main">
          {planData.c > planData.ma5 && '五均之上'}
        </Typography>
        <Typography align="center" color="success.main">
          {planData &&
            planData.ma20 > planData.pre[0].ma20 &&
            planData.pre[0].ma20 > planData.pre[1].ma20 &&
            '月線向上'}
        </Typography>
        <Typography align="center" color="error">
          {planData &&
            planData.ma20 < planData.pre[0].ma20 &&
            planData.pre[0].ma20 < planData.pre[1].ma20 &&
            '月線向下'}
        </Typography>

        {planData &&
        (planData.k as number) > (planData.d as number) &&
        (planData.k as number) > (planData.pre[0].k as number) &&
        (planData.rsv as number) > (planData.pre[0].rsv as number) ? (
          <Typography align="center" color="success.main">
            KD趨勢向上
          </Typography>
        ) : (planData.k as number) < (planData.d as number) &&
          (planData.k as number) < (planData.pre[0].k as number) &&
          (planData.rsv as number) < (planData.pre[0].rsv as number) ? (
          <Typography align="center" color="error">
            KD趨勢向下
          </Typography>
        ) : (
          <Typography align="center">KD趨勢不明</Typography>
        )}

        <Typography align="center" color="success.main">
          {planData &&
            (planData.osc as number) > (planData.pre[0].osc as number) &&
            (planData.pre[0].osc as number) > (planData.pre[1].osc as number) &&
            (planData.macd as number) < (planData.pre[0].macd as number) &&
            (planData.pre[0].macd as number) <
              (planData.pre[1].macd as number) &&
            'Macd負背離(強)'}
        </Typography>
        <Typography align="center" color="error">
          {planData &&
            (planData.osc as number) < (planData.pre[0].osc as number) &&
            (planData.pre[0].osc as number) < (planData.pre[1].osc as number) &&
            (planData.macd as number) > (planData.pre[0].macd as number) &&
            (planData.pre[0].macd as number) >
              (planData.pre[1].macd as number) &&
            'Macd正背離(弱)'}
        </Typography>
        <Typography align="center" color="success.main">
          {planData &&
            (planData.osc as number) > (planData.pre[0].osc as number) &&
            (planData.pre[0].osc as number) > (planData.pre[1].osc as number) &&
            (planData.macd as number) > (planData.pre[0].macd as number) &&
            (planData.pre[0].macd as number) >
              (planData.pre[1].macd as number) &&
            'Macd多方動能漸強'}
        </Typography>
        <Typography align="center" color="error">
          {planData &&
            (planData.osc as number) < (planData.pre[0].osc as number) &&
            (planData.pre[0].osc as number) < (planData.pre[1].osc as number) &&
            (planData.macd as number) < (planData.pre[0].macd as number) &&
            (planData.pre[0].macd as number) <
              (planData.pre[1].macd as number) &&
            'Macd空方動能漸強'}
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
          外資: {Math.floor(planData['foreign_investors'] / 1000) || 0}
        </Typography>
        <Typography align="left">
          投信: {Math.floor(planData['investment_trust'] / 1000) || 0}
        </Typography>
        <Typography align="left">
          自營: {Math.floor(planData['dealer'] / 1000) || 0}
        </Typography>

        <Typography align="left" variant="subtitle2" color="secondary">
          營收月份: {`${stock.monthly_revenue[0].year}/${stock.monthly_revenue[0].month}` || 0}
        </Typography>
        <Typography align="left">
          月增率: {stock.monthly_revenue[0].month_over_month_revenue || 0}%
        </Typography>
        <Typography align="left">
          年增率: {stock.monthly_revenue[0].year_over_year_revenue || 0}%
        </Typography>
        <Typography align="left">
          累計營收比較:
          {stock.monthly_revenue[0].compare_cumulative_revenue || 0}%
        </Typography>
      </TableCell>
    </TableRow>
  );
}
