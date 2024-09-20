import { isMa20NegativeTrend } from '@/app/selectstock/(utils)/assessment/negative';
import {
  isCloseAboveMa10,
  isCloseAboveMa20,
  isCloseAboveMa5,
  isMa20PositiveTrend,
} from '@/app/selectstock/(utils)/assessment/positive';
import { TaxieData } from '@/app/selectstock/types';
import { Stack, Typography } from '@mui/material';

export default function MovingAverage({
  taiexData,
}: {
  taiexData: TaxieData[];
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="caption">均線趨勢:</Typography>
      <Stack spacing={1}>
        {isMa20PositiveTrend(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isMa20PositiveTrend(taiexData, 0)}
          </Typography>
        ) : isMa20NegativeTrend(taiexData, 0) ? (
          <Typography variant="caption" color="error">
            {isMa20NegativeTrend(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="caption">月線趨勢不明</Typography>
        )}

        <Typography variant="caption">
          {isCloseAboveMa5(taiexData, 0)
            ? isCloseAboveMa10(taiexData, 0)
            : isCloseAboveMa20(taiexData, 0) || '所有短均線之下'}
        </Typography>
      </Stack>
    </Stack>
  );
}
