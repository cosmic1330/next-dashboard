'use client';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useStocks from '../(hooks)/useStocks';

export default function Stocks() {
  const { isLoading, progress, success } = useStocks();
  return (
    <Box>
      {isLoading ? (
        <Typography variant="body2">Loding... {progress}%</Typography>
      ) : (
        <Typography variant="body2">Data Lenght:{success}</Typography>
      )}
    </Box>
  );
}
