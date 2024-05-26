import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import { Box, Typography } from '@mui/material';
import { Fragment, useContext } from 'react';

export default function ExclusionValue({ planData }: { planData: any }) {
  const { useDExclusionValue } = useContext(SelectStockContext);
  return (
    <Box>
      {useDExclusionValue ? (
        <Fragment>
          {/* 均線維持上揚的價格 */}
          <Typography align="center" variant="caption">
            d 扣抵值
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              planData.c >= planData.exclusionValueMa5.d
                ? 'success.main'
                : 'error'
            }
          >
            ma5:
            {/* 箭頭向下代表未來扣抵值下降ma5較容易往上揚 */}
            <Typography
              component={'span'}
              color={
                planData.exclusionValueMa5.d > planData.exclusionValueMa5['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {planData.exclusionValueMa5.d > planData.exclusionValueMa5['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {/* 數值代表均線上揚必須高過此價位 */}
            {planData.exclusionValueMa5.d}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              planData.c >= planData.exclusionValueMa10.d
                ? 'success.main'
                : 'error'
            }
          >
            ma10:
            <Typography
              component={'span'}
              color={
                planData.exclusionValueMa10.d >
                planData.exclusionValueMa10['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {planData.exclusionValueMa10.d >
              planData.exclusionValueMa10['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {planData.exclusionValueMa10.d}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              planData.c >= planData.exclusionValueMa20.d
                ? 'success.main'
                : 'error'
            }
          >
            ma20:
            <Typography
              component={'span'}
              color={
                planData.exclusionValueMa20.d >
                planData.exclusionValueMa20['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {planData.exclusionValueMa20.d >
              planData.exclusionValueMa20['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {planData.exclusionValueMa20.d}
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          <Typography align="center" variant="caption">
            d-1 扣抵值
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              planData.c >= planData.exclusionValueMa5['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma5:
            <Typography
              component={'span'}
              color={
                planData.exclusionValueMa5['d-1'] > planData.exclusionValueMa5.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {planData.exclusionValueMa5['d-1'] > planData.exclusionValueMa5.d
                ? '↓'
                : '↑'}
            </Typography>
            {planData.exclusionValueMa5['d-1']}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              planData.c >= planData.exclusionValueMa10['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma10:
            <Typography
              component={'span'}
              color={
                planData.exclusionValueMa10['d-1'] >
                planData.exclusionValueMa10.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {planData.exclusionValueMa10['d-1'] >
              planData.exclusionValueMa10.d
                ? '↓'
                : '↑'}
            </Typography>
            {planData.exclusionValueMa10['d-1']}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              planData.c >= planData.exclusionValueMa20['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma20:
            <Typography
              component={'span'}
              color={
                planData.exclusionValueMa20['d-1'] >
                planData.exclusionValueMa20.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {planData.exclusionValueMa20['d-1'] >
              planData.exclusionValueMa20.d
                ? '↓'
                : '↑'}
            </Typography>
            {planData.exclusionValueMa20['d-1']}
          </Typography>
        </Fragment>
      )}
    </Box>
  );
}
