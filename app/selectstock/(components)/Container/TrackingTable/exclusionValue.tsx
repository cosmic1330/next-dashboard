import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import { Box, Typography } from '@mui/material';
import { Fragment, useContext } from 'react';

export default function ExclusionValue({ stock }: { stock: any }) {
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
              stock &&
              stock?.data[stock.data.length - 1]?.c >=
                stock?.data[stock.data.length - 1]?.exclusionValueMa5.d
                ? 'success.main'
                : 'error'
            }
          >
            ma5:
            <Typography
              component={'span'}
              color={
                stock?.data[stock.data.length - 1]?.exclusionValueMa5.d >
                stock?.data[stock.data.length - 1]?.exclusionValueMa5['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {stock?.data[stock.data.length - 1]?.exclusionValueMa5.d >
              stock?.data[stock.data.length - 1]?.exclusionValueMa5['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {stock && stock?.data[stock.data.length - 1]?.exclusionValueMa5.d}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              stock &&
              stock?.data[stock.data.length - 1]?.c >=
                stock?.data[stock.data.length - 1]?.exclusionValueMa10.d
                ? 'success.main'
                : 'error'
            }
          >
            ma10:
            <Typography
              component={'span'}
              color={
                stock?.data[stock.data.length - 1]?.exclusionValueMa10.d >
                stock?.data[stock.data.length - 1]?.exclusionValueMa10['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {stock?.data[stock.data.length - 1]?.exclusionValueMa10.d >
              stock?.data[stock.data.length - 1]?.exclusionValueMa10['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {stock && stock?.data[stock.data.length - 1]?.exclusionValueMa10.d}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              stock &&
              stock?.data[stock.data.length - 1]?.c >=
                stock?.data[stock.data.length - 1]?.exclusionValueMa20.d
                ? 'success.main'
                : 'error'
            }
          >
            ma20:
            <Typography
              component={'span'}
              color={
                stock?.data[stock.data.length - 1]?.exclusionValueMa20.d >
                stock?.data[stock.data.length - 1]?.exclusionValueMa20['d+1']
                  ? 'success.main'
                  : 'error'
              }
            >
              {stock?.data[stock.data.length - 1]?.exclusionValueMa20.d >
              stock?.data[stock.data.length - 1]?.exclusionValueMa20['d+1']
                ? '↓'
                : '↑'}
            </Typography>
            {stock && stock?.data[stock.data.length - 1]?.exclusionValueMa20.d}
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
              stock &&
              stock?.data[stock.data.length - 1]?.c >=
                stock?.data[stock.data.length - 1]?.exclusionValueMa5['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma5:
            <Typography
              component={'span'}
              color={
                stock?.data[stock.data.length - 1]?.exclusionValueMa5['d-1'] >
                stock?.data[stock.data.length - 1]?.exclusionValueMa5.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {stock?.data[stock.data.length - 1]?.exclusionValueMa5['d-1'] >
              stock?.data[stock.data.length - 1]?.exclusionValueMa5.d
                ? '↓'
                : '↑'}
            </Typography>
            {stock &&
              stock?.data[stock.data.length - 1]?.exclusionValueMa5['d-1']}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              stock &&
              stock?.data[stock.data.length - 1]?.c >=
                stock?.data[stock.data.length - 1]?.exclusionValueMa10['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma10:
            <Typography
              component={'span'}
              color={
                stock?.data[stock.data.length - 1]?.exclusionValueMa10['d-1'] >
                stock?.data[stock.data.length - 1]?.exclusionValueMa10.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {stock?.data[stock.data.length - 1]?.exclusionValueMa10['d-1'] >
              stock?.data[stock.data.length - 1]?.exclusionValueMa10.d
                ? '↓'
                : '↑'}
            </Typography>
            {stock &&
              stock?.data[stock.data.length - 1]?.exclusionValueMa10['d-1']}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color={
              stock &&
              stock?.data[stock.data.length - 1]?.c >=
                stock?.data[stock.data.length - 1]?.exclusionValueMa20['d-1']
                ? 'success.main'
                : 'error'
            }
          >
            ma20:
            <Typography
              component={'span'}
              color={
                stock?.data[stock.data.length - 1]?.exclusionValueMa20['d-1'] >
                stock?.data[stock.data.length - 1]?.exclusionValueMa20.d
                  ? 'success.main'
                  : 'error'
              }
            >
              {stock?.data[stock.data.length - 1]?.exclusionValueMa20['d-1'] >
              stock?.data[stock.data.length - 1]?.exclusionValueMa20.d
                ? '↓'
                : '↑'}
            </Typography>
            {stock &&
              stock?.data[stock.data.length - 1]?.exclusionValueMa20['d-1']}
          </Typography>
        </Fragment>
      )}
    </Box>
  );
}
