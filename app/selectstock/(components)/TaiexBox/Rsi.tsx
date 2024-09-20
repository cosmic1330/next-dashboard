import {
  isRsiDeathCross,
  isRsiNegativeTrend,
} from '@/app/selectstock/(utils)/assessment/negative';
import {
  isRsiGoldenCross,
  isRsiPositiveTrend,
} from '@/app/selectstock/(utils)/assessment/positive';
import { TaxieData } from '@/app/selectstock/types';
import { Box, Stack, Typography } from '@mui/material';

export default function Rsi({ taiexData }: { taiexData: TaxieData[] }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="caption">Rsi 趨勢:</Typography>
      <Stack>
        {isRsiPositiveTrend(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isRsiPositiveTrend(taiexData, 0)}
          </Typography>
        ) : isRsiNegativeTrend(taiexData, 0) ? (
          <Typography variant="caption" color="error">
            {isRsiNegativeTrend(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="caption">Rsi 趨勢不明</Typography>
        )}
        <Typography variant="caption" color="success.main">
          {isRsiGoldenCross(taiexData, 0)}
        </Typography>
        <Typography variant="caption" color="error">
          {isRsiDeathCross(taiexData, 0)}
        </Typography>
      </Stack>
    </Stack>
  );
}
