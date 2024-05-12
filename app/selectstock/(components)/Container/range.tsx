'use client';

import { Grid, Stack, TextField, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useContext } from 'react';
import { RollbackDateContext } from '../../(context)/rollback';

export default function Range() {
  const { rollback_date, setRollbackDate } = useContext(RollbackDateContext);
  const handleChange = (e: any) => {
    setRollbackDate(e.target?.value);
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h6">回測天數</Typography>
        <TextField
          type="number"
          value={rollback_date}
          onChange={handleChange}
        />
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
