'use client';
import { StatusContext } from '@/app/backtest/(context)/status';
import { useBackTest } from '@/store/zustand';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useContext } from 'react';

export default function Detail() {
  const {} = useContext(StatusContext);
  const { context } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Details
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="caption" color="ActiveBorder">
              资本:
            </Typography>
            <Typography variant="body2" color="ActiveBorder">
              {context?.capital}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="caption" color="ActiveBorder">
              利润:
            </Typography>
            <Typography variant="body2" color="ActiveBorder">
              $ {context?.record.profit}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="caption" color="ActiveBorder">
              盈利數:
            </Typography>
            <Typography variant="body2" color="ActiveBorder">
              {context?.record.win}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" color="ActiveBorder">
              亏损數:
            </Typography>
            <Typography variant="body2" color="ActiveBorder">
              {context?.record.lose}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="caption" color="ActiveBorder">
              未实现利润:
            </Typography>
            <Typography variant="body2" color="ActiveBorder">
              $ {context?.unSoldProfit}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="caption" color="ActiveBorder">
              持股數:
            </Typography>
            <Typography variant="body2" color="ActiveBorder">
              {Object.values(context?.record.inventory || {}).length}
            </Typography>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}
