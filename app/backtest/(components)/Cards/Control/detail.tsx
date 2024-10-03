'use client';
import { StatusContext } from '@/app/backtest/(context)/status';
import { Context } from '@ch20026103/backtest';
import { Box, Grid, Typography } from '@mui/material';
import { forwardRef, useContext, useImperativeHandle } from 'react';

export interface DetailRef {
  update: () => void;
}

interface DetailProps {
  context: Context;
}

const Detail = forwardRef<DetailRef, DetailProps>(({ context }, ref) => {
  const { setUpdateTrigger } = useContext(StatusContext);
  useImperativeHandle(ref, () => ({
    update: () => setUpdateTrigger && setUpdateTrigger((prev) => prev + 1),
  }));

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          当前日期:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context.dateSequence.currentDate}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          剩餘日期數:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context.dateSequence.futureDates.length}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          執行日期數:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context.dateSequence.historyDates.length}
        </Typography>
      </Grid>
    </Grid>
  );
});

Detail.displayName = 'Detail';

export default Detail;
