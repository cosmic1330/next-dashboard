import {
  isMacdMomentumBuildDown,
  isMacdNegativeDivergence,
} from '@/app/selectstock/(utils)/assessment/negative';
import {
  isMacdMomentumBuildUp,
  isMacdPositiveDivergence,
} from '@/app/selectstock/(utils)/assessment/positive';
import { TaxieData } from '@/app/selectstock/types';
import { Stack, Typography } from '@mui/material';

export default function Macd({ taiexData }: { taiexData: TaxieData[] }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="caption">Macd 趨勢:</Typography>
      <Stack>
        {isMacdMomentumBuildUp(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isMacdMomentumBuildUp(taiexData, 0)}
          </Typography>
        ) : isMacdMomentumBuildDown(taiexData, 0) ? (
          <Typography variant="caption" color="error">
            {isMacdMomentumBuildDown(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="caption">Macd 趨勢不明</Typography>
        )}
        {isMacdPositiveDivergence(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isMacdPositiveDivergence(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="caption" color="error">
            {isMacdNegativeDivergence(taiexData, 0)}
          </Typography>
        )}
      </Stack>
      <Stack>
        {taiexData[taiexData.length - 1].dif !== null &&
        taiexData[taiexData.length - 1].dif !== undefined &&
        taiexData[taiexData.length - 1].dif > 0 ? (
          <Typography variant="caption" color="success.main">
            位於多方動能區
          </Typography>
        ) : (
          <Typography variant="caption" color="error">
            位於空方動能區
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
