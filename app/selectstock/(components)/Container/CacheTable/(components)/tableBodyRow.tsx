'use client';
import { RollbackDateContext } from '@/app/selectstock/(context)/rollback';
import { useTrackingList } from '@/store/zustand';
import CheckIcon from '@mui/icons-material/Check';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { IconButton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Fragment, useContext, useMemo } from 'react';
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
  const { add } = useTrackingList();
  const { isLoading, data } = useDayStockData(stock);
  const { rollback_date } = useContext(RollbackDateContext);

  const { stockDayData } = useMemo(() => {
    try {
      if(rollback_date === 0) return { stockDayData: data };
      const stockDayData = data?.slice(0, -rollback_date);
      return { stockDayData };
    } catch (error) {
      console.log(data);
      return { stockDayData: [], stockWeekData: [] };
    }
  }, [data, rollback_date]);

  const { strategy1, strategy2, strategy3, strategy4, strategy5, strategy6 } =
    useStrategy();

  const handleAdd = () => {
    add({
      id: stock[0],
      date: stockDayData?.[stockDayData.length - 1].t || 0,
      plan: `Cache Plan@${strategy1Res ? '[strategy1]' : ''}${
        strategy2Res ? '[strategy2]' : ''
      }
      ${strategy3Res ? '[strategy3]' : ''}
      ${strategy4Res ? '[strategy4]' : ''}${strategy5Res ? '[strategy5]' : ''}`,
      name: stock[1],
      c: stockDayData?.[stockDayData.length - 1].c || 0,
    });
  };

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
          <IconButton color="success" onClick={handleAdd}>
            <NoteAddOutlinedIcon />
          </IconButton>
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
