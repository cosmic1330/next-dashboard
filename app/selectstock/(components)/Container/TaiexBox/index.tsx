import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import useQueryTaiex from './(hooks)/useQueryTaiex';
import Date from './Date';
import Kd from './Kd';
import Macd from './Macd';
import MovingAverage from './MovingAverage';
import OffsetValue from './OffsetValue';

export default function TaiexBox() {
  const taiexData = useQueryTaiex();
  return taiexData.length === 0 ? (
    <Fragment />
  ) : (
    <Box>
      <Typography variant="h6">加權指數</Typography>
      <Date taiexData={taiexData} />
      <OffsetValue taiexData={taiexData} />
      <MovingAverage taiexData={taiexData} />
      <Kd taiexData={taiexData} />
      <Macd taiexData={taiexData} />
    </Box>
  );
}
