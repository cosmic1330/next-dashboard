import { TaxieData } from '@/app/selectstock/types';
import { Stack, Typography } from '@mui/material';

export default function Date({ taiexData }: { taiexData: TaxieData[] }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="caption" color="white">日期:</Typography>
      <Typography variant="caption" color="white">
        {taiexData[taiexData.length - 1].t}
      </Typography>
    </Stack>
  );
}
