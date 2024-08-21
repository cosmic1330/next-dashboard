'use client';
import { V2StocksResponseRow } from '@/app/api/taiwan-stock/v2/stocks/route';
import { Box, Typography } from '@mui/material';

export default function Eps({ stock }: { stock: V2StocksResponseRow }) {
  return (
    <Box>
      <Typography align="left" variant="subtitle2" color="secondary">
        EPS: {stock.eps.length > 0 ? stock.eps[0]?.season : null}
      </Typography>
      <Typography align="left">
        {stock.eps.length > 0 ? stock.eps[0]?.eps_data : null} / 股
      </Typography>
    </Box>
  );
}
