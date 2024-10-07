import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Fragment } from 'react';
import useQueryTaiex from './(hooks)/useQueryTaiex';
import Date from './Date';
import Kd from './Kd';
import Macd from './Macd';
import MovingAverage from './MovingAverage';
import OffsetValue from './OffsetValue';
import Rsi from './Rsi';

export default function TaiexBox() {
  const taiexData = useQueryTaiex();
  return taiexData.length === 0 ? (
    <Fragment />
  ) : (
    <Box>
      <Link
        target="_blank"
        rel="noreferrer"
        href={`https://tw.stock.yahoo.com/quote/%5ETWII`}
      >
        <Typography variant="h6" color="white">加權指數</Typography>
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href={`https://tw.tradingview.com/chart/8TP8jY00/?symbol=INDEX%3ATAIEX`}
      >
        <Date taiexData={taiexData} />
      </Link>
      <OffsetValue taiexData={taiexData} />
      <MovingAverage taiexData={taiexData} />
      <Kd taiexData={taiexData} />
      <Macd taiexData={taiexData} />
      <Rsi taiexData={taiexData} />
    </Box>
  );
}
