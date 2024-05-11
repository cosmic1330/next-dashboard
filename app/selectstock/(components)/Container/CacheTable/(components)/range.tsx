'use client';

import { useStockStore } from '@/store/zustand';
import { Stack, TextField, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

export default function Range() {
  const { change, retrospect } = useStockStore();
  const habdleChange = (e: any) => {
    change(e.target?.value);
  };
  return (
    <Stack>
      <Typography variant="h6">資料範圍</Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={(value: number) => {
          return `${value}日`;
        }}
        step={1}
        valueLabelDisplay="auto"
        max={0}
        min={-100}
        onChange={habdleChange}
      />
      <TextField type="number" value={retrospect} onChange={habdleChange} />
    </Stack>
  );
}
