'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import { Box, Typography } from '@mui/material';

export default function Monthly({ stock }: { stock: V2StocksResponseRow }) {
  return (
    <Box>
      <Typography align="left" variant="subtitle2" color="secondary">
        營收月份:{''}
        {stock.monthly_revenue.length > 0
          ? `${stock.monthly_revenue[0]?.year}/${stock.monthly_revenue[0]?.month}`
          : `無資料`}
      </Typography>
      <Typography align="left">
        月增率:
        {stock.monthly_revenue.length > 0
          ? stock.monthly_revenue[0]?.month_over_month_revenue
          : 0}
        %
      </Typography>
      <Typography align="left">
        年增率:
        {stock.monthly_revenue.length > 0
          ? stock.monthly_revenue[0]?.year_over_year_revenue
          : 0}
        %
      </Typography>
      <Typography align="left">
        累計營收比較:
        <br />
        {stock.monthly_revenue.length > 0
          ? stock.monthly_revenue[0]?.compare_cumulative_revenue
          : 0}
        %
      </Typography>
    </Box>
  );
}
