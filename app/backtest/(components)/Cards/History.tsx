'use client';
import { useBackTest } from '@/store/zustand';
import { dateFormat } from '@ch20026103/anysis';
import { Mode } from '@ch20026103/anysis/dist/esm/stockSkills/utils/dateFormat';
import {
  Box,
  CardContent,
  Divider,
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
    grid-column: auto / span 3;
  }
  /* 平板裝置 (橫向模式，螢幕寬度 1024px 至 1199px) */
  @media screen and (min-width: 1024px) {
    grid-column: auto / span 2;
  }
`;

export default function History() {
  const {} = useContext(StatusContext);
  const { context } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          History 交易紀錄
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={2.5}>
            <Typography variant="caption" color="ActiveBorder">
              Date
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" color="ActiveBorder">
              Stock
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" color="ActiveBorder">
              Buy Price
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" color="ActiveBorder">
              Sell Price
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Typography variant="caption" color="ActiveBorder">
              Profit
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" color="ActiveBorder">
              Cause
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ height: '150px', maxHeight: '150px', overflowY: 'auto' }}>
          {Object.values(context?.record.history || {}).map(
            (item: any, index) => (
              <Box key={index}>
                <Grid container spacing={1}>
                  <Grid item xs={2.5}>
                    <Typography variant="body2">
                      {dateFormat(item.buy.t, Mode.NumberToString)}
                    </Typography>
                    <Typography variant="body2">
                      {dateFormat(item.sell.t, Mode.NumberToString)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`https://tw.stock.yahoo.com/q/ta?s=${item.id}`}
                      >
                        {`${item.id}`}
                      </Link>
                    </Typography>
                    <Typography variant="body2">
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${item.id}.html`}
                      >
                        {`${item.name}`}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" color="primary">
                      {`$${item.buy.buyPrice}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography variant="body2" color="primary">
                      {`$${item.sell.sellPrice}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography
                      variant="body2"
                      color={
                        item.buy.buyPrice - item.sell.sellPrice > 0
                          ? 'success.main'
                          : 'error'
                      }
                    >
                      {`$${item.buy.buyPrice - item.sell.sellPrice}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" color="primary">
                      {`${item.buy.detail}/${item.sell.detail}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ),
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
