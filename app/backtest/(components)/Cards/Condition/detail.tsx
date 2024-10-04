'use client';
import { StatusContext } from '@/app/backtest/(context)/status';
import { useBackTest } from '@/store/zustand';
import { Context } from '@ch20026103/backtest';
import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';

const Detail = ()=> {
  const {} = useContext(StatusContext);
  const { context } = useBackTest();
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Typography variant="caption" color="ActiveBorder">
          Market模組
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
          {context?.market ? 'True' : 'N/A'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="caption" color="ActiveBorder">
          市場情緒:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
        {context?.marketSentiment ? 'True' : 'N/A'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="caption" color="ActiveBorder">
          購買清單確認方法:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
        {context?.reviewPurchaseListMethod ? 'True' : 'N/A'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="caption" color="ActiveBorder">
          賣出清單確認方法:
        </Typography>
        <Typography variant="body2" color="ActiveBorder">
        {context?.reviewSellListMethod ? 'True' : 'N/A'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Detail;
