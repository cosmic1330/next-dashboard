import { SelectStockContext } from '@/app/selectstock/(context)/selectStockContext';
import { Box, Typography } from '@mui/material';
import { Fragment, useContext } from 'react';

export default function ExclusionValue({ planData }: { planData: any }) {
  const { useDExclusionValue } = useContext(SelectStockContext);
  return (
    <Box>
      {useDExclusionValue ? (
        <Fragment>
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
            {planData.exclusionValueMa20['d-1']}
          </Typography>
        </Fragment>
      )}
    </Box>
  );
}
