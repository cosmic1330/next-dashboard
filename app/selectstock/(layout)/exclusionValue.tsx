import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import { Box, Typography } from '@mui/material';
import { Fragment, useContext } from 'react';
import { StockData } from '../types';

export default function ExclusionValue({
  stockData,
  rollback_date,
}: {
  stockData: StockData[];
  rollback_date: number;
}) {
  const { useDExclusionValue } = useContext(SelectStockContext);
  const current = stockData[stockData.length - 1 - rollback_date];
  if (
    current.exclusionValueMa5 === undefined ||
    current.exclusionValueMa10 === undefined ||
    current.exclusionValueMa20 === undefined
  )
    return <Fragment />;
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
              current.c >= current.exclusionValueMa5.d
                ? 'success.main'
                : 'error'
            }
          >
            ma5:
            {/* 箭頭向下代表未來扣抵值下降ma5較容易往上揚 */}
            <Typography
              component={'span'}
              color={
                current.exclusionValueMa5.d > current.exclusionValueMa5['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {current.exclusionValueMa5.d > current.exclusionValueMa5['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {/* 數值代表均線上揚必須高過此價位 */}
            {current.exclusionValueMa5.d}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              current.c >= current.exclusionValueMa10.d
                ? 'success.main'
                : 'error'
            }
          >
            ma10:
            <Typography
              component={'span'}
              color={
                current.exclusionValueMa10.d > current.exclusionValueMa10['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {current.exclusionValueMa10.d > current.exclusionValueMa10['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {current.exclusionValueMa10.d}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              current.c >= current.exclusionValueMa20.d
                ? 'success.main'
                : 'error'
            }
          >
            ma20:
            <Typography
              component={'span'}
              color={
                current.exclusionValueMa20.d > current.exclusionValueMa20['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {current.exclusionValueMa20.d > current.exclusionValueMa20['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {current.exclusionValueMa20.d}
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
              current.c >= current.exclusionValueMa5['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma5:
            <Typography
              component={'span'}
              color={
                current.exclusionValueMa5['d-1'] > current.exclusionValueMa5.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {current.exclusionValueMa5['d-1'] > current.exclusionValueMa5.d
                ? '↓'
                : '↑'}
            </Typography>
            {current.exclusionValueMa5['d-1']}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              current.c >= current.exclusionValueMa10['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma10:
            <Typography
              component={'span'}
              color={
                current.exclusionValueMa10['d-1'] > current.exclusionValueMa10.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {current.exclusionValueMa10['d-1'] > current.exclusionValueMa10.d
                ? '↓'
                : '↑'}
            </Typography>
            {current.exclusionValueMa10['d-1']}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              current.c >= current.exclusionValueMa20['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma20:
            <Typography
              component={'span'}
              color={
                current.exclusionValueMa20['d-1'] > current.exclusionValueMa20.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {current.exclusionValueMa20['d-1'] > current.exclusionValueMa20.d
                ? '↓'
                : '↑'}
            </Typography>
            {current.exclusionValueMa20['d-1']}
          </Typography>
        </Fragment>
      )}
    </Box>
  );
}
