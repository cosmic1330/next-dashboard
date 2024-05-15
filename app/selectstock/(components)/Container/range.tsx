'use client';

import { Button, Grid, Stack, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useContext } from 'react';
import { SelectStockContext } from '../../(context)/selectStockContext';

export default function Range() {
  const { rollback_date, setRollbackDate } = useContext(SelectStockContext);
  const handleChange = (e: any) => {
    setRollbackDate(e.target?.value);
  };
  const add = () => {
    setRollbackDate(rollback_date + 1);
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h6">回測天數</Typography>
        <Button variant="outlined" onClick={add}>
          {rollback_date}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Stack mt={'20px'}>
          <Slider
            getAriaValueText={(value: number) => {
              return `${value}日`;
            }}
            step={1}
            valueLabelDisplay="auto"
            max={100}
            min={0}
            onChange={handleChange}
            value={rollback_date}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
