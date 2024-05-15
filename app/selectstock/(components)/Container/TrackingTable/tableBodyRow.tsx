'use client';
import { useTrackingList } from '@/store/zustand';
import CancelIcon from '@mui/icons-material/Cancel';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { IconButton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useQueryPrice from './(hooks)/useQueryPrice';

export default function TableBodyRow({ str }: { str: string }) {
  const { data: stock } = useQueryPrice(str);
  const { remove } = useTrackingList();

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
            stock.data[stock.data.length - 1].c >
              stock.data[stock.data.length - 2].c && (
              <NorthIcon fontSize="small" sx={{ color: 'red' }} />
            )}
          {stock &&
            stock.data[stock.data.length - 1].c <
              stock.data[stock.data.length - 2].c && (
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
          </Link>{' '}
          (
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://tw.stock.yahoo.com/q/ta?s=${stock && stock.id}`}
          >
            {stock && stock.name}
          </Link>
          )
        </Typography>
        <Typography align="center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={` https://tw.tradingview.com/chart/8TP8jY00/?symbol=TWSE%3A${
              stock && stock.id
            }`}
          >
            {stock &&
              Math.round(
                ((stock.data[stock.data.length - 1].c -
                  stock.data[stock.data.length - 2].c) /
                  stock.data[stock.data.length - 2].c) *
                  100 *
                  100,
              ) / 100}
            %
          </Link>
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="center">
          date: {stock && stock.data[stock.data.length - 1].t}
        </Typography>
        <Link
          target="_blank"
          rel="noreferrer"
          href={`https://www.wantgoo.com/stock/${
            stock && stock.id
          }/major-investors/main-trend#main-trend`}
        >
          {stock && stock.data[stock.data.length - 1].c}
        </Link>
        <Typography align="center">買進價格: {stock && stock.c}</Typography>
      </TableCell>

      <TableCell align="center">
        <IconButton color="success" onClick={handleRemove}>
          <CancelIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock.data.length - 1].ma5 >
              stock.data[stock.data.length - 1].ma10 &&
            stock.data[stock.data.length - 1].ma10 >
              stock.data[stock.data.length - 1].ma20 &&
            '正向排列'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock.data.length - 1].c >
              stock.data[stock.data.length - 1].ma20 &&
            '月線之上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock.data.length - 1].c >
              stock.data[stock.data.length - 1].ma5 &&
            '五均之上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            stock.data[stock?.data.length - 1].ma20 >
              stock.data[stock?.data.length - 2].ma20 &&
            stock.data[stock?.data.length - 2].ma20 >
              stock.data[stock?.data.length - 3].ma20 &&
            '月線向上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock.data[stock?.data.length - 1].k as number) >
              (stock.data[stock?.data.length - 1].d as number) &&
            (stock.data[stock?.data.length - 1].k as number) >
              (stock.data[stock?.data.length - 2].k as number) &&
            (stock.data[stock?.data.length - 1].rsv as number) >
              (stock.data[stock?.data.length - 2].rsv as number) &&
            'KD趨勢向上'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock.data[stock?.data.length - 1].osc as number) >
              (stock.data[stock?.data.length - 2].osc as number) &&
            (stock.data[stock?.data.length - 2].osc as number) >
              (stock.data[stock?.data.length - 3].osc as number) &&
            (stock.data[stock?.data.length - 1].macd as number) <
              (stock.data[stock?.data.length - 2].macd as number) &&
            (stock.data[stock?.data.length - 2].macd as number) <
              (stock.data[stock?.data.length - 3].macd as number) &&
            'Macd負背離(轉強)'}
        </Typography>
        <Typography align="center" color="success.main">
          {stock &&
            (stock.data[stock?.data.length - 1].osc as number) >
              (stock.data[stock?.data.length - 2].osc as number) &&
            (stock.data[stock?.data.length - 2].osc as number) >
              (stock.data[stock?.data.length - 3].osc as number) &&
            (stock.data[stock?.data.length - 1].macd as number) >
              (stock.data[stock?.data.length - 2].macd as number) &&
            (stock.data[stock?.data.length - 2].macd as number) >
              (stock.data[stock?.data.length - 3].macd as number) &&
            '多方動能漸強'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].l <
              stock.data[stock.data.length - 1].ma20 &&
            '盤中跌破月線'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].l <
              stock.data[stock.data.length - 1].ma5 &&
            '盤中跌破五均'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].l <
              stock.data[stock.data.length - 1].ma10 &&
            '盤中跌破十均'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].l <
              stock.data[stock.data.length - 2].l &&
            stock.data[stock.data.length - 1].h <=
              stock.data[stock.data.length - 2].h &&
            '跌破前低且未突破前高'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].k <
              stock.data[stock.data.length - 1].d &&
            stock.data[stock.data.length - 2].k >
              stock.data[stock.data.length - 2].d &&
            'KD死叉'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].v >
              stock.data[stock.data.length - 2].v &&
            stock.data[stock.data.length - 1].c <
              stock.data[stock.data.length - 1].o &&
            '爆量綠K'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            stock.data[stock.data.length - 1].c <
              stock.data[stock.data.length - 1].o &&
            stock.data[stock.data.length - 1].l <
              stock.data[stock.data.length - 2].l &&
            ((stock.data[stock.data.length - 1].h -
              stock.data[stock.data.length - 1].l) /
              stock.data[stock.data.length - 1].l) *
              100 <
              5 &&
            '趨勢反轉長綠K'}
        </Typography>
        <Typography align="center" color={'error'}>
          {stock &&
            ((stock.data[stock.data.length - 1].ma20 -
              stock.data[stock.data.length - 1].ma60) /
              stock.data[stock.data.length - 1].ma60) *
              100 <
              10 &&
            '季線乖離過大'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            stock.data[stock?.data.length - 1].ma20 <
              stock.data[stock?.data.length - 2].ma20 &&
            stock.data[stock?.data.length - 2].ma20 <
              stock.data[stock?.data.length - 3].ma20 &&
            '月線向下'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock.data[stock?.data.length - 1].k as number) <
              (stock.data[stock?.data.length - 1].d as number) &&
            (stock.data[stock?.data.length - 1].k as number) <
              (stock.data[stock?.data.length - 2].k as number) &&
            'KD趨勢向下'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            stock.data[stock?.data.length - 1] &&
            (stock.data[stock?.data.length - 1].osc as number) <
              (stock.data[stock?.data.length - 2].osc as number) &&
            (stock.data[stock?.data.length - 2].osc as number) <
              (stock.data[stock?.data.length - 3].osc as number) &&
            (stock.data[stock?.data.length - 1].macd as number) >
              (stock.data[stock?.data.length - 2].macd as number) &&
            (stock.data[stock?.data.length - 2].macd as number) >
              (stock.data[stock?.data.length - 3].macd as number) &&
            'Macd正背離(轉弱)'}
        </Typography>
        <Typography align="center" color="error">
          {stock &&
            (stock.data[stock?.data.length - 1].osc as number) <
              (stock.data[stock?.data.length - 2].osc as number) &&
            (stock.data[stock?.data.length - 2].osc as number) <
              (stock.data[stock?.data.length - 3].osc as number) &&
            (stock.data[stock?.data.length - 1].macd as number) <
              (stock.data[stock?.data.length - 2].macd as number) &&
            (stock.data[stock?.data.length - 2].macd as number) <
              (stock.data[stock?.data.length - 3].macd as number) &&
            '空方動能漸強'}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
