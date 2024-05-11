'use client';
import { useStockStore } from '@/store/zustand';
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Fragment, useMemo } from 'react';
import useDayStockData from '../(hooks)/useDayStockData';
import useStrategy from '../(hooks)/useStrategy';
import { StocksType } from '../type';

export default function TableBodyRow({
  stock,
  index,
}: {
  stock: StocksType;
  index: number;
}) {
  const { isLoading, data } = useDayStockData(stock);
  const { retrospect } = useStockStore();

  const { stockDayData } = useMemo(() => {
    try {
      if (retrospect !== '0') {
        const stockDayData = data?.slice(0, parseInt(retrospect));
        return { stockDayData };
      } else {
        return { stockDayData: data };
      }
    } catch (error) {
      console.log(data);
      return { stockDayData: [], stockWeekData: [] };
    }
  }, [data, retrospect]);

  const { strategy1, strategy2, strategy3, strategy4, strategy5, strategy6 } =
    useStrategy();

  const [strategy1Res, strategy2Res, strategy3Res, strategy4Res, strategy5Res] =
    useMemo(() => {
      const res = [false, false, false, false, false, false];
      if (stockDayData && strategy1(stockDayData)) res[0] = true;
      if (stockDayData && strategy2(stockDayData)) res[1] = true;
      if (stockDayData && strategy3(stockDayData)) res[2] = true;
      if (stockDayData && strategy4(stockDayData)) res[3] = true;
      if (stockDayData && strategy5(stockDayData)) res[4] = true;
      return res;
    }, [stockDayData, strategy1, strategy2, strategy3, strategy4, strategy5]);

  if (
    strategy1Res ||
    strategy2Res ||
    strategy3Res ||
    strategy4Res ||
    strategy5Res
  )
    return (
      <TableRow hover>
        <TableCell component="th" scope="row">
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://www.wantgoo.com/stock/${stock[0]}/major-investors/main-trend#main-trend`}
          >
            {stockDayData?.[stockDayData.length - 1].t}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row" align="center" width={10}>
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${stock[0]}.html`}
          >
            {stock[1]}
          </Link>
          (
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://tw.stock.yahoo.com/q/ta?s=${stock[0]}`}
          >
            {stock[0]}
          </Link>
          )
        </TableCell>
        <TableCell align="center">
          <Typography align="center" hidden={!strategy1Res}>
            <CheckIcon />
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography align="center" hidden={!strategy2Res}>
            <CheckIcon />
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography align="center" hidden={!strategy3Res}>
            <CheckIcon />
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography align="center" hidden={!strategy4Res}>
            <CheckIcon />
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography align="center" hidden={!strategy5Res}>
            <CheckIcon />
          </Typography>
        </TableCell>
      </TableRow>
    );
  return <Fragment />;
}
