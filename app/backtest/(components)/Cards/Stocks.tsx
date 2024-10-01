'use client';
import { useBackTest } from '@/store/zustand';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import useStocks from '../../(hooks)/useStocks';

export default function Stocks() {
  const { isLoading, progress, success } = useStocks();
  const { context } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Data Status
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {isLoading ? (
            <Typography variant="body2">Loding... {progress}%</Typography>
          ) : (
            <Typography variant="body2">Data Lenght:{success}</Typography>
          )}
          <Button
            onClick={() => console.log(context)}
            variant="outlined"
            size="small"
          >
            Console
          </Button>

          <Button
            onClick={() => context?.init()}
            variant="outlined"
            size="small"
          >
            Init
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
