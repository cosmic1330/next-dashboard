'use client';
import useTaiex from '@/app/backtest/(hooks)/useTaiex';
import { useBackTest } from '@/store/zustand';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import useStocks from '../../../(hooks)/useStocks';
import Clear from './clear';
import Csv from './csv';
import Init from './init';

export default function DataStatus() {
  const { data: taiexData, isLoading: isTaiexLoading } = useTaiex();
  const { isLoading, progress, success } = useStocks();
  const { context } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Data Status
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {isTaiexLoading ? (
              <Typography variant="body2">Taiex Loding...</Typography>
            ) : (
              <Typography variant="body2">
                Taiex Data Lenght:{taiexData?.length}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <Typography variant="body2">
                Stock Loding... {progress}%
              </Typography>
            ) : (
              <Typography variant="body2">
                Stock Data Lenght:{success}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="center"
              gap={1}
            >
              <Button
                onClick={() => console.log(context)}
                variant="outlined"
                size="small"
              >
                Console
              </Button>
              <Init />
              <Csv />
              <Clear />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
