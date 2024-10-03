'use client';
import { useBackTest } from '@/store/zustand';
import { BuyPrice, SellPrice } from '@ch20026103/backtest/dist/esm/context';
import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Card as MuiCard,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
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
  @media screen and (min-width: 1024px) and (max-width: 1199px) {
    grid-column: auto / span 2;
  }
`;

export default function Options() {
  const {} = useContext(StatusContext);
  const {
    context,
    lowStockPrice,
    hightStockPrice,
    capital,
    buyPrice,
    sellPrice,
    setOptions,
  } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Custom Options
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={4}>
            <TextField
              variant="outlined"
              required
              label="Capital"
              defaultValue={capital}
              InputLabelProps={{ shrink: true }}
              onBlur={(e) => {
                if (e.target.value) {
                  context?.updateOptions({ capital: parseInt(e.target.value) });
                  setOptions('capital', parseInt(e.target.value));
                }
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              required
              label="HightStockPrice"
              defaultValue={hightStockPrice}
              InputLabelProps={{ shrink: true }}
              onBlur={(e) => {
                if (e.target.value) {
                  context?.updateOptions({
                    hightStockPrice: parseInt(e.target.value),
                  });
                  setOptions('hightStockPrice', parseInt(e.target.value));
                }
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              required
              type="number"
              label="LowStockPrice"
              defaultValue={lowStockPrice}
              InputLabelProps={{ shrink: true }}
              onBlur={(e) => {
                if (e.target.value) {
                  context?.updateOptions({
                    lowStockPrice: parseInt(e.target.value),
                  });
                  setOptions('lowStockPrice', parseInt(e.target.value));
                }
              }}
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="buy-price">Buy Price</InputLabel>
              <Select
                labelId="buy-price"
                defaultValue={buyPrice}
                label="Buy Price"
                onBlur={(e) => {
                  if (e.target.value) {
                    const value = e.target.value as BuyPrice;
                    context?.updateOptions({ buyPrice: value });
                    setOptions('buyPrice', value);
                  }
                }}
              >
                <MenuItem disabled value={undefined}>
                  未選擇
                </MenuItem>
                <MenuItem value={BuyPrice.CLOSE}>收盤價</MenuItem>
                <MenuItem value={BuyPrice.HIGHT}>最高價</MenuItem>
                <MenuItem value={BuyPrice.LOW}>最低價</MenuItem>
                <MenuItem value={BuyPrice.OPEN}>開盤價</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="sell-price">Sell Price</InputLabel>
              <Select
                labelId="sell-price"
                defaultValue={sellPrice}
                label="Sell Price"
                onChange={(e) => {
                  if (e.target.value) {
                    const value = e.target.value as SellPrice;
                    context?.updateOptions({ sellPrice: value });
                    setOptions('sellPrice', value);
                  }
                }}
              >
                <MenuItem disabled value={undefined}>
                  未選擇
                </MenuItem>
                <MenuItem value={SellPrice.CLOSE}>收盤價</MenuItem>
                <MenuItem value={SellPrice.HIGHT}>最高價</MenuItem>
                <MenuItem value={SellPrice.LOW}>最低價</MenuItem>
                <MenuItem value={SellPrice.OPEN}>開盤價</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
