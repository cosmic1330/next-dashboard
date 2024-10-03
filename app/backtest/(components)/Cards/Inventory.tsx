'use client';
import { useBackTest } from '@/store/zustand';
import { dateFormat } from '@ch20026103/anysis';
import { Mode } from '@ch20026103/anysis/dist/esm/stockSkills/utils/dateFormat';
import {
  Box,
  CardContent,
  Grid,
  Card as MuiCard,
  Typography,
  styled,
} from '@mui/material';
import Link from 'next/link';
import { useContext } from 'react';
import { StatusContext } from '../../(context)/status';
export const Card = styled(MuiCard)`
  /* 手機裝置 (螢幕寬度 480px 至 767px) */
  @media screen and (min-width: 480px) and (max-width: 767px) {
    grid-column: auto / span 2;
  }
  /* 平板裝置 (豎向模式，螢幕寬度 768px 至 1023px) */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: auto / span 2;
  }
  /* 平板裝置 (橫向模式，螢幕寬度 1024px 至 1199px) */
  @media screen and (min-width: 1024px) {
    grid-column: auto / span 2;
  }
`;

export default function Inventory() {
  const {} = useContext(StatusContext);
  const { context } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Inventory
        </Typography>
        <Grid item xs={12}>
          <Typography variant="caption" color="ActiveBorder">
            當前库存:
          </Typography>
          <Box sx={{ height: '150px', maxHeight: '150px', overflowY: 'auto' }}>
            {Object.values(context?.record.inventory || {}).map(
              (item: any, index) => (
                <Grid container key={index} spacing={1}>
                  <Grid item xs={0.5}>
                    {index + 1}.
                  </Grid>
                  <Grid item xs={3.5}>
                    <Typography variant="body2">
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`https://tw.stock.yahoo.com/q/ta?s=${item.id}`}
                      >
                        {`${dateFormat(item.t, Mode.NumberToString)}`}
                      </Link>

                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${item.id}.html`}
                      >
                        {`[${item.id} ${context?.stocks[item.id].name}]`}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" color="primary" mr={2}>
                      {`Buy Price: $${item.c}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body1"
                      color={
                        context?.stocks[item.id]?.currentData?.c &&
                        (context?.stocks[item.id]?.currentData?.c as number) >
                          item.c
                          ? 'success.main'
                          : 'error'
                      }
                    >
                      {`Cur Price: $${context?.stocks[item.id]?.currentData?.c}`}
                    </Typography>
                  </Grid>
                </Grid>
              ),
            )}
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
}
