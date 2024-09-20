'use client';
import ExclusionValue from '@/app/selectstock/(layout)/exclusionValue';
import { LocalStorageValueType } from '@/store/types';
import { useTrackingList } from '@/store/zustand';
import CancelIcon from '@mui/icons-material/Cancel';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { Divider, IconButton, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KBar from '../../K_bar';
import useQueryPrice from './(hooks)/useQueryPrice';

export default function TableBodyRow({
  data,
}: {
  data: LocalStorageValueType;
}) {
  const { id, date, listed, plan, name, c } = data;
  const { stockData, positives, negatives } = useQueryPrice(id);
  const williams8 = stockData[stockData.length - 1]?.williams8 as number;
  const { remove } = useTrackingList();

  const handleRemove = () => {
    remove(id);
  };

  if (stockData.length === 0)
    return (
      <TableRow hover>
        <TableCell align="left">
          <Typography variant="body2">Plan: {plan}</Typography>
          <Typography variant="body2">Add Date: {date}</Typography>
        </TableCell>
        <TableCell>
          <Typography align="center">
            <Link
              target="_blank"
              rel="noreferrer"
              href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${id}.html`}
            >
              {id}
            </Link>

            {'('}
            <Link
              target="_blank"
              rel="noreferrer"
              href={`https://tw.stock.yahoo.com/q/ta?s=${id}`}
            >
              {name}
            </Link>
            {')'}
          </Typography>
          <Typography align="center">
            <Link
              target="_blank"
              rel="noreferrer"
              href={
                listed
                  ? `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TWSE%3A${id}`
                  : `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TPEX%3A${id}`
              }
            >
              TrandView
            </Link>
          </Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton color="success" onClick={handleRemove}>
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );

  return (
    <TableRow hover>
      <TableCell align="left">
        <Typography variant="body2">Plan: {plan}</Typography>
        <Typography variant="body2">Add Date: {date}</Typography>
      </TableCell>

      <TableCell>
        <Typography align="center">
          {stockData[stockData.length - 1].c >
            stockData[stockData.length - 2].c && (
            <NorthIcon fontSize="small" sx={{ color: 'red' }} />
          )}
          {stockData[stockData.length - 1].c <
            stockData[stockData.length - 2].c && (
            <SouthIcon fontSize="small" sx={{ color: 'green' }} />
          )}
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${id}.html`}
          >
            {id}
          </Link>

          {'('}
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://tw.stock.yahoo.com/q/ta?s=${id}`}
          >
            {name}
          </Link>
          {')'}
        </Typography>
        <Typography align="center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={
              listed
                ? `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TWSE%3A${id}`
                : `https://tw.tradingview.com/chart/8TP8jY00/?symbol=TPEX%3A${id}`
            }
          >
            {Math.round(
              ((stockData[stockData.length - 1].c -
                stockData[stockData.length - 2].c) /
                stockData[stockData.length - 2].c) *
                100 *
                100,
            ) / 100}
            %
          </Link>
        </Typography>
      </TableCell>

      <TableCell align="center">
        <KBar
          l={stockData[stockData.length - 1].l}
          h={stockData[stockData.length - 1].h}
          c={stockData[stockData.length - 1].c}
          o={stockData[stockData.length - 1].o}
          upper={
            stockData[stockData.length - 2].c +
            stockData[stockData.length - 2].c * 0.1
          }
          lower={
            stockData[stockData.length - 2].c -
            stockData[stockData.length - 2].c * 0.1
          }
          ma5={stockData[stockData.length - 1].ma5}
        />
      </TableCell>
      <TableCell align="center">
        <Typography align="center" variant="body2">
          date: {stockData[stockData.length - 1].t}
        </Typography>
        <Typography align="center" variant="body1">
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://www.wantgoo.com/stock/${id}/major-investors/main-trend#main-trend`}
          >
            現在價格: {stockData[stockData.length - 1].c}
          </Link>
        </Typography>
        <Typography align="center" variant="body2">
          買進價格: {c}
        </Typography>
        <Divider />
        <ExclusionValue stockData={stockData} rollback_date={0} />
        <Typography
          align="center"
          variant="body2"
          color={
            williams8 > -20
              ? 'success.light'
              : williams8 > -50
                ? 'success.dark'
                : williams8 > -80
                  ? 'error.dark'
                  : 'error.light'
          }
        >
          威廉溫度計:{williams8}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <IconButton color="success" onClick={handleRemove}>
          <CancelIcon />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        {positives.map((positive) => (
          <Typography key={positive} align="center" color="success.main">
            {positive}
          </Typography>
        ))}
      </TableCell>
      <TableCell align="center">
        {negatives.map((negative) => (
          <Typography key={negative} align="center" color="error">
            {negative}
          </Typography>
        ))}
      </TableCell>
    </TableRow>
  );
}
