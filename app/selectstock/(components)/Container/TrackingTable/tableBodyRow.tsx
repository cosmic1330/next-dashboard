'use client';
import { useTrackingList } from '@/store/zustand';
import CancelIcon from '@mui/icons-material/Cancel';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { Divider, IconButton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useQueryPrice from './(hooks)/useQueryPrice';
import ExclusionValue from './exclusionValue';

export default function TableBodyRow({ str }: { str: string }) {
  const { data: stock } = useQueryPrice(str);
  const { remove } = useTrackingList();

  if (!stock) return false;

  const handleRemove = () => {
    if (stock) remove(stock.id);
  };

  return (
    <TableRow hover>
      <TableCell align="left">
        <Typography variant="body2">Plan: {stock && stock.plan}</Typography>
        <Typography variant="body2">Add Date: {stock && stock.date}</Typography>
      </TableCell>
      <TableCell>
        <Typography align="center">
          {stock &&
            stock?.data[stock.data.length - 1]?.c >
              stock?.data[stock.data.length - 2]?.c && (
              <NorthIcon fontSize="small" sx={{ color: 'red' }} />
            )}
          {stock &&
            stock?.data[stock.data.length - 1]?.c <
              stock?.data[stock.data.length - 2]?.c && (
              <SouthIcon fontSize="small" sx={{ color: 'green' }} />
            )}
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${
              stock && stock.id
            }.html`}
          >
            {stock && stock.id}
          </Link>

          {'('}
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://tw.stock.yahoo.com/q/ta?s=${stock && stock.id}`}
          >
            {stock && stock.name}
          </Link>
          {')'}
        </Typography>
        <Typography align="center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={
              stock && stock.listed
                ? `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TWSE%3A${stock.id}`
                : `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TPEX%3A${stock.id}`
            }
          >
            {stock &&
              Math.round(
                ((stock?.data[stock.data.length - 1]?.c -
                  stock?.data[stock.data.length - 2]?.c) /
                  stock?.data[stock.data.length - 2]?.c) *
                  100 *
                  100,
              ) / 100}
            %
          </Link>
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="center" variant="body2">
          date: {stock && stock?.data[stock.data.length - 1]?.t}
        </Typography>
        <Typography align="center" variant="body1">
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://www.wantgoo.com/stock/${
              stock && stock.id
            }/major-investors/main-trend#main-trend`}
          >
            現在價格: {stock && stock?.data[stock.data.length - 1]?.c}
          </Link>
        </Typography>
        <Typography align="center" variant="body2">
          買進價格: {stock && stock.c}
        </Typography>
        <Divider />
        <ExclusionValue stock={stock} />
      </TableCell>

      <TableCell align="center">
        <IconButton color="success" onClick={handleRemove}>
          <CancelIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        {/* Ma */}
        <Typography align="center" color="success.main">
          {stock &&
            stock?.data[stock.data.length - 1]?.ma5 >
              stock?.data[stock.data.length - 1]?.ma10 &&
            stock?.data[stock.data.length - 1]?.ma10 >
              stock?.data[stock.data.length - 1]?.ma20 &&
            '正向排列'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock?.data[stock.data.length - 1]?.c >
              stock?.data[stock.data.length - 1]?.ma20 &&
            '月線之上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            stock?.data[stock?.data.length - 1]?.ma20 >
              stock?.data[stock?.data.length - 2]?.ma20 &&
            stock?.data[stock?.data.length - 2]?.ma20 >
              stock?.data[stock?.data.length - 3]?.ma20 &&
            '月線向上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock?.data[stock.data.length - 1]?.c >
              stock?.data[stock.data.length - 1]?.ma5 &&
            '5日均之上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            stock?.data[stock?.data.length - 1]?.ma5 >
              stock?.data[stock?.data.length - 2]?.ma5 &&
            stock?.data[stock?.data.length - 2]?.ma5 >
              stock?.data[stock?.data.length - 3]?.ma5 &&
            '5日均向上'}
        </Typography>
        {/* KD */}
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock?.data[stock?.data.length - 1]?.k as number) >
              (stock?.data[stock?.data.length - 1]?.d as number) &&
            (stock?.data[stock?.data.length - 1]?.k as number) >
              (stock?.data[stock?.data.length - 2]?.k as number) &&
            (stock?.data[stock?.data.length - 1]?.rsv as number) >
              (stock?.data[stock?.data.length - 2]?.rsv as number) &&
            'KD趨勢向上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.k as number) >
              (stock?.data[stock?.data.length - 1]?.d as number) &&
            (stock?.data[stock?.data.length - 2]?.k as number) <
              (stock?.data[stock?.data.length - 2]?.d as number) &&
            'KD黃金交叉'}
        </Typography>
        {/* MAcd */}
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock?.data[stock?.data.length - 1]?.osc as number) >
              (stock?.data[stock?.data.length - 2]?.osc as number) &&
            (stock?.data[stock?.data.length - 2]?.osc as number) >
              (stock?.data[stock?.data.length - 3]?.osc as number) &&
            (stock?.data[stock?.data.length - 1]?.macd as number) <
              (stock?.data[stock?.data.length - 2]?.macd as number) &&
            (stock?.data[stock?.data.length - 2]?.macd as number) <
              (stock?.data[stock?.data.length - 3]?.macd as number) &&
            'Macd負背離(轉強)'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.osc as number) >
              (stock?.data[stock?.data.length - 2]?.osc as number) &&
            (stock?.data[stock?.data.length - 2]?.osc as number) >
              (stock?.data[stock?.data.length - 3]?.osc as number) &&
            (stock?.data[stock?.data.length - 1]?.macd as number) >
              (stock?.data[stock?.data.length - 2]?.macd as number) &&
            (stock?.data[stock?.data.length - 2]?.macd as number) >
              (stock?.data[stock?.data.length - 3]?.macd as number) &&
            '多方動能漸強'}
        </Typography>
        {/* Obv */}
        <Typography align="center" color="success.main">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.obv as number) >
              (stock?.data[stock?.data.length - 1]?.obvMa5 as number) &&
            (stock?.data[stock?.data.length - 1]?.obvMa5 as number) >
              (stock?.data[stock?.data.length - 1]?.obvMa10 as number) &&
            'Obv正向排列'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.obv as number) >
              (stock?.data[stock?.data.length - 1]?.obvMa5 as number) &&
            'Obv多頭'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.obv as number) >
              (stock?.data[stock?.data.length - 1]?.obvMa5 as number) &&
            (stock?.data[stock?.data.length - 2]?.obv as number) <
              (stock?.data[stock?.data.length - 2]?.obvMa5 as number) &&
            'Obv黃金交叉'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        {/* K棒 */}
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.l <
              stock?.data[stock.data.length - 2]?.l &&
            stock?.data[stock.data.length - 1]?.h <=
              stock?.data[stock.data.length - 2]?.h &&
            '跌破前低且未突破前高'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.v >
              stock?.data[stock.data.length - 2]?.v &&
            stock?.data[stock.data.length - 1]?.c <
              stock?.data[stock.data.length - 1]?.o &&
            '爆量綠K'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.c <
              stock?.data[stock.data.length - 1]?.o &&
            stock?.data[stock.data.length - 2]?.c >=
              stock?.data[stock.data.length - 1]?.l &&
            ((stock?.data[stock.data.length - 1]?.h -
              stock?.data[stock.data.length - 1]?.c) /
              stock?.data[stock.data.length - 1]?.c) *
              100 >
              3 &&
            '趨勢反轉長綠K'}
        </Typography>
        {/* Ma */}
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.l <
              stock?.data[stock.data.length - 1]?.ma20 &&
            '盤中跌破月線'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.l <
              stock?.data[stock.data.length - 1]?.ma5 &&
            '盤中跌破5日均'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.l <
              stock?.data[stock.data.length - 1]?.ma10 &&
            '盤中跌破10日均'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.ma5 >
              stock?.data[stock.data.length - 1]?.ma20 &&
            ((stock?.data[stock.data.length - 1]?.ma5 -
              stock?.data[stock.data.length - 1]?.ma20) /
              stock?.data[stock.data.length - 1]?.ma20) *
              100 >
              15 &&
            `5日均乖離過大 ${Math.round(
              ((stock?.data[stock.data.length - 1]?.ma5 -
                stock?.data[stock.data.length - 1]?.ma20) /
                stock?.data[stock.data.length - 1]?.ma20) *
                100,
            )}%`}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.ma20 >
              stock?.data[stock.data.length - 1]?.ma60 &&
            ((stock?.data[stock.data.length - 1]?.ma20 -
              stock?.data[stock.data.length - 1]?.ma60) /
              stock?.data[stock.data.length - 1]?.ma60) *
              100 >
              15 &&
            `月線乖離過大 ${Math.round(
              ((stock?.data[stock.data.length - 1]?.ma20 -
                stock?.data[stock.data.length - 1]?.ma60) /
                stock?.data[stock.data.length - 1]?.ma60) *
                100,
            )}%`}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            stock?.data[stock?.data.length - 1]?.ma5 <
              stock?.data[stock?.data.length - 2]?.ma5 &&
            stock?.data[stock?.data.length - 2]?.ma5 <
              stock?.data[stock?.data.length - 3]?.ma5 &&
            '5日均向下'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            stock?.data[stock?.data.length - 1]?.ma20 <
              stock?.data[stock?.data.length - 2]?.ma20 &&
            stock?.data[stock?.data.length - 2]?.ma20 <
              stock?.data[stock?.data.length - 3]?.ma20 &&
            '月線向下'}
        </Typography>
        {/* KD */}
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock?.data[stock?.data.length - 1]?.k as number) <
              (stock?.data[stock?.data.length - 1]?.d as number) &&
            (stock?.data[stock?.data.length - 1]?.k as number) <
              (stock?.data[stock?.data.length - 2]?.k as number) &&
            'KD趨勢向下'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock?.data[stock.data.length - 1]?.k <
              stock?.data[stock.data.length - 1]?.d &&
            stock?.data[stock.data.length - 2]?.k >
              stock?.data[stock.data.length - 2]?.d &&
            'KD死叉'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock?.data[stock?.data.length - 1]?.osc as number) <
              (stock?.data[stock?.data.length - 2]?.osc as number) &&
            (stock?.data[stock?.data.length - 2]?.osc as number) <
              (stock?.data[stock?.data.length - 3]?.osc as number) &&
            (stock?.data[stock?.data.length - 1]?.macd as number) >
              (stock?.data[stock?.data.length - 2]?.macd as number) &&
            (stock?.data[stock?.data.length - 2]?.macd as number) >
              (stock?.data[stock?.data.length - 3]?.macd as number) &&
            'Macd正背離(轉弱)'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.osc as number) <
              (stock?.data[stock?.data.length - 2]?.osc as number) &&
            (stock?.data[stock?.data.length - 2]?.osc as number) <
              (stock?.data[stock?.data.length - 3]?.osc as number) &&
            (stock?.data[stock?.data.length - 1]?.macd as number) <
              (stock?.data[stock?.data.length - 2]?.macd as number) &&
            (stock?.data[stock?.data.length - 2]?.macd as number) <
              (stock?.data[stock?.data.length - 3]?.macd as number) &&
            '空方動能漸強'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.obv as number) <
              (stock?.data[stock?.data.length - 1]?.obvMa5 as number) &&
            'Obv空頭'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.obv as number) <
              (stock?.data[stock?.data.length - 1]?.obvMa5 as number) &&
            (stock?.data[stock?.data.length - 1]?.obvMa5 as number) <
              (stock?.data[stock?.data.length - 1]?.obvMa10 as number) &&
            'Obv空頭排列'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            (stock?.data[stock?.data.length - 1]?.obv as number) <
              (stock?.data[stock?.data.length - 1]?.obvMa10 as number) &&
            (stock?.data[stock?.data.length - 2]?.obv as number) >
              (stock?.data[stock?.data.length - 2]?.obvMa10 as number) &&
            'Obv死亡交叉'}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
