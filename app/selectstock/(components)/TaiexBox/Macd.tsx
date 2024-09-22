import {
  isMacdInBearishZone,
  isMacdMomentumBuildDown,
  isMacdPositiveDivergence,
  isOscContractionSignalsTopping,
} from '@/app/selectstock/(utils)/assessment/negative';
import {
  isMacdInBullishZone,
  isMacdMomentumBuildUp,
  isMacdNegativeDivergence,
  isOscContractionSignalsBottoming,
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
          <Typography variant="caption" color="error">
            {isMacdPositiveDivergence(taiexData, 0)}
          </Typography>
        ) : (
          isMacdNegativeDivergence(taiexData, 0) && (
            <Typography variant="caption" color="success.main">
              {isMacdNegativeDivergence(taiexData, 0)}
            </Typography>
          )
        )}
        {isOscContractionSignalsTopping(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isOscContractionSignalsTopping(taiexData, 0)}
          </Typography>
        ) : (
          isOscContractionSignalsBottoming(taiexData, 0) && (
            <Typography variant="caption" color="error">
              {isOscContractionSignalsBottoming(taiexData, 0)}
            </Typography>
          )
        )}
      </Stack>
      <Stack>
        {isMacdInBullishZone(taiexData, 0) ? (
          <Typography variant="caption" color="success.main">
            {isMacdInBullishZone(taiexData, 0)}
          </Typography>
        ) : (
          isMacdInBearishZone(taiexData, 0) && (
            <Typography variant="caption" color="error">
              {isMacdInBearishZone(taiexData, 0)}
            </Typography>
          )
        )}
      </Stack>
    </Stack>
  );
}
