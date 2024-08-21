'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import { useTrackingList } from '@/store/zustand';
import NorthIcon from '@mui/icons-material/North';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SouthIcon from '@mui/icons-material/South';
import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import { ResGoldType, StockData } from '../types';
import Eps from './eps';
import ExclusionValue from './exclusionValue';
import Monthly from './monthly';

export default function TableBodyRow({
  stock,
  gold,
  stockData,
  positives,
  negatives,
  rollback_date,
  plan,
}: {
  stock: V2StocksResponseRow;
  gold: ResGoldType;
  stockData: StockData[];
  positives: string[];
  negatives: string[];
  rollback_date: number;
  plan: string;
}) {
  const current = stockData[stockData.length - 1 - rollback_date];
  const before1 = stockData[stockData.length - 2 - rollback_date];
  const { add, list } = useTrackingList();

  const handleAdd = () => {
    if (list.has(stock.stock_id)) {
      toast.info(`${stock.stock_id} ${stock.stock_name} has exist!`);
      return;
    }
    add({
      id: stock.stock_id,
      date: current.t,
      listed: stock.listed,
      plan,
      name: stock.stock_name,
      c: current.c,
    });
    toast.success(`${stock.stock_id} ${stock.stock_name} added!`);
  };

  return (
    <TableRow key={stock.stock_name} hover>
      <TableCell component="th" scope="row">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`https://www.wantgoo.com/stock/${stock.stock_id}/major-investors/main-trend#main-trend`}
        >
          {current.t}
        </Link>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <Typography align="center">
          <Tooltip title={'與昨日收盤價比較'} placement="top">
            <>
              {current.c > before1.c && (
                <NorthIcon fontSize="small" sx={{ color: 'red' }} />
              )}
              {current.c < before1.c && (
                <SouthIcon fontSize="small" sx={{ color: 'green' }} />
              )}
            </>
          </Tooltip>
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${stock.stock_id}.html`}
          >
            {stock.stock_name}
          </Link>
          {'('}
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://tw.stock.yahoo.com/q/ta?s=${stock.stock_id}`}
          >
            {stock.stock_id}
          </Link>
          {')'}
        </Typography>
        <Typography align="center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={
              stock.listed
                ? `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TWSE%3A${stock.stock_id}`
                : `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TPEX%3A${stock.stock_id}`
            }
          >
            {Math.round(((current.c - before1.c) / before1.c) * 100 * 100) /
              100}
            %
          </Link>
        </Typography>
      </TableCell>
      <TableCell align="center">
        {current.c}
        <Divider />
        <ExclusionValue stockData={stockData} rollback_date={rollback_date} />
      </TableCell>
      <TableCell align="center">
        <IconButton color="success" onClick={handleAdd}>
          <NoteAddOutlinedIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        {positives.map((positive) => (
          <Typography key={positive} align="center" color="success.main">
            {positive}
          </Typography>
        ))}
        {negatives.map((negative) => (
          <Typography key={negative} align="center" color="error">
            {negative}
          </Typography>
        ))}
      </TableCell>
      <TableCell align="center">
        <Typography align="left">超強勢 : {gold.superStrong}</Typography>
        <Typography align="left">---強勢 : {gold.strong}</Typography>
        <Typography align="left">---中度 : {gold.middle}</Typography>
        <Typography align="left">---弱勢 : {gold.weak}</Typography>
        <Typography align="left">超弱勢 : {gold.superWeak}</Typography>
        <Typography align="left">
          前高:
          <br />
          {gold.highestPointDate} {gold.highestPoint}
        </Typography>
        <Typography align="left">
          前低:
          <br />
          {gold.lowestPointDate} {gold.lowestPoint}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="left">
          外資: {Math.floor(current.foreign_investors / 1000) || 0}
        </Typography>
        <Typography align="left">
          投信: {Math.floor(current.investment_trust / 1000) || 0}
        </Typography>
        <Typography align="left">
          自營: {Math.floor(current.dealer / 1000) || 0}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Stack spacing={2}>
          <Eps stock={stock} />
          <Monthly stock={stock} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
