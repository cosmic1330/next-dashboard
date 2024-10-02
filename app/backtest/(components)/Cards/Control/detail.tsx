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
    <Grid container spacing={1} p={2}>
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
          资本:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context.capital}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          资本:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          $ {context.capital}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          利润:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          $ {context.record.profit}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          盈利數:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context.record.win}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          亏损數:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context.record.lose}
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Typography variant="caption" color="ActiveBorder">
          未实现利润:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          $ {context.unSoldProfit}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="caption" color="ActiveBorder">
          當前库存:
        </Typography>
        <Box sx={{ height: '100px', maxHeight: '100px', overflowY: 'auto' }}>
          {Object.values(context.record.inventory).map((item: any, index) => (
            <Typography variant="body2" color="ActiveBorder" key={index}>
              {`${index + 1}. [${item.id}] price:${item.buyPrice} c:${item.c}`}
            </Typography>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
});

Detail.displayName = 'Detail';

export default Detail;
