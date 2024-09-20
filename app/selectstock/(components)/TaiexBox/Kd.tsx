import {
  isKdDeathCross,
  isKdNegativeTrend,
} from '@/app/selectstock/(utils)/assessment/negative';
import {
  isKdGoldenCross,
  isKdPositiveTrend,
} from '@/app/selectstock/(utils)/assessment/positive';
import { TaxieData } from '@/app/selectstock/types';
import { Box, Stack, Typography } from '@mui/material';

export default function Kd({ taiexData }: { taiexData: TaxieData[] }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="caption">Kd 趨勢:</Typography>
      <Stack>
        {isKdPositiveTrend(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isKdPositiveTrend(taiexData, 0)}
          </Typography>
        ) : isKdNegativeTrend(taiexData, 0) ? (
          <Typography variant="caption" color="error">
            {isKdNegativeTrend(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="caption">Kd 趨勢不明</Typography>
        )}
        <Typography variant="caption" color="success.main">
          {isKdGoldenCross(taiexData, 0)}
        </Typography>
        <Typography variant="caption" color="error">
          {isKdDeathCross(taiexData, 0)}
        </Typography>
      </Stack>
    </Stack>
  );
}
