'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { ReactElement, memo, useMemo, useState } from 'react';
import { StocksType } from '../type';
import Range from './range';
import Table from './table';

export default memo(function Controller({
  stocks,
}: {
  stocks: StocksType[];
}) {
  // 本益比
  const [peRatio, setPeRatio] = useState(true);
  // 殖利率
  const [dividendYield, setDividendYield] = useState(true);
  // 股價淨值比
  const [pbRatio, setPbRatio] = useState(true);

  const filterStocks = useMemo(() => {
    return stocks.filter((stock) => {
      if (peRatio && stock[4] === '-') return false;
      if (dividendYield && parseInt(stock[2]) === 0) return false;
      if (pbRatio && parseFloat(stock[5]) < 1.5) return false;
      return true;
    });
  }, [stocks, peRatio, dividendYield, pbRatio]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">選擇條件</Typography>
        <Typography variant="button">
          Stocks 數量: {filterStocks.length}
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={peRatio}
                onChange={() => setPeRatio(!peRatio)}
              />
            }
            label="有本益比"
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={dividendYield}
                onChange={() => setDividendYield(!dividendYield)}
              />
            }
            label=" 有殖利率"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={pbRatio}
                onChange={() => setPbRatio(!pbRatio)}
              />
            }
            label="股價淨值比小於 1.5"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <Range />
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            策略１注意事項:
          </AccordionSummary>
          <AccordionDetails>
            <Typography>隔日最高價未高於今日最高價 賣出</Typography>
            <Typography>隔日最低價未高於今日最低價 賣出</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            策略２注意事項:
          </AccordionSummary>
          <AccordionDetails>
            <Typography>隔日再次跌破月線 賣出</Typography>
            <Typography>隔日最低價跌破於今日最低價 賣出</Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12} >
        <Table stocks={filterStocks}/>
      </Grid>
    </Grid>
  );
});
