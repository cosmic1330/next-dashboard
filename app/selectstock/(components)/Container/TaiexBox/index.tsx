import {
  isKdDeathCross,
  isKdNegativeTrend,
  isMa20NegativeTrend,
  isMacdMomentumBuildDown,
  isMacdNegativeDivergence,
} from '@/app/selectstock/(utils)/assessment/negative';
import {
  isCloseAboveMa10,
  isCloseAboveMa20,
  isCloseAboveMa5,
  isKdGoldenCross,
  isKdPositiveTrend,
  isMa20PositiveTrend,
  isMacdMomentumBuildUp,
  isMacdPositiveDivergence,
} from '@/app/selectstock/(utils)/assessment/positive';
import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import useQueryTaiex from './(hooks)/useQueryTaiex';

export default function TaiexBox() {
  const taiexData = useQueryTaiex();
  return taiexData.length === 0 ? (
    <Fragment />
  ) : (
    <Box>
      <Typography variant="h6">加權指數</Typography>
      <Box>
        <Typography component="span" variant="subtitle2">
          日期:
        </Typography>
        <Typography component="span" variant="body2">
          {taiexData[taiexData.length - 1].t}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          Ma5扣抵值:
        </Typography>
        <Typography
          component={'span'}
          color={
            (taiexData[taiexData.length - 1].exclusionValueMa5 as any).d >
            (taiexData[taiexData.length - 1].exclusionValueMa5 as any)['d+1']
              ? 'success.main'
              : 'error'
          }
        >
          {(taiexData[taiexData.length - 1].exclusionValueMa5 as any).d >
          (taiexData[taiexData.length - 1].exclusionValueMa5 as any)['d+1']
            ? '↓'
            : '↑'}
        </Typography>
        <Typography component="span" variant="body2">
          {(taiexData[taiexData.length - 1].exclusionValueMa5 as any).d}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          月線:
        </Typography>
        {isMa20PositiveTrend(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="success.main">
            {isMa20PositiveTrend(taiexData, 0)}
          </Typography>
        ) : isMa20NegativeTrend(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="error">
            {isMa20NegativeTrend(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="body2" component="span">
            盤整
          </Typography>
        )}
        <Typography variant="body2" component="span" color="success.main">
          {isCloseAboveMa5(taiexData, 0) ||
            isCloseAboveMa10(taiexData, 0) ||
            isCloseAboveMa20(taiexData, 0)}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          KD趨勢:
        </Typography>
        {isKdPositiveTrend(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="success.main">
            {isKdPositiveTrend(taiexData, 0)}
          </Typography>
        ) : isKdNegativeTrend(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="error">
            {isKdNegativeTrend(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="body2" component="span">
            趨勢不明
          </Typography>
        )}
        <Typography variant="body2" component="span" color="success.main">
          {isKdGoldenCross(taiexData, 0)}
        </Typography>
        <Typography variant="body2" component="span" color="error">
          {isKdDeathCross(taiexData, 0)}
        </Typography>
      </Box>
      <Box>
        <Typography component="span" variant="subtitle2">
          Macd趨勢:
        </Typography>
        {isMacdMomentumBuildUp(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="success.main">
            {isMacdMomentumBuildUp(taiexData, 0)}
          </Typography>
        ) : isMacdMomentumBuildDown(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="error">
            {isMacdMomentumBuildDown(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="body2" component="span">
            趨勢不明
          </Typography>
        )}
        {isMacdPositiveDivergence(taiexData, 0) ? (
          <Typography variant="body2" component="span" color="success.main">
            {isMacdPositiveDivergence(taiexData, 0)}
          </Typography>
        ) : (
          <Typography variant="body2" component="span" color="success.main">
            {isMacdNegativeDivergence(taiexData, 0)}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
