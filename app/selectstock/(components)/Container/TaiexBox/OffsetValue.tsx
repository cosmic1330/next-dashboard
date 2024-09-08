import { TaxieData } from '@/app/selectstock/types';
import { Box, Stack, Typography } from '@mui/material';

export default function OffsetValue({ taiexData }: { taiexData: TaxieData[] }) {
  return (
    <Stack direction="row" spacing={1}>
      <Box>
        <Typography variant="caption">均線/扣抵值:</Typography>
      </Box>
      <Box>
        <Box>
          <Stack spacing={1} direction={'row'}>
            <Typography
              variant="caption"
              color={
                (taiexData[taiexData.length - 1] as any).ma5 >
                (taiexData[taiexData.length - 2] as any).ma5
                  ? 'success.main'
                  : 'error'
              }
            >
              ma5
              {(taiexData[taiexData.length - 1] as any).ma5 >
              (taiexData[taiexData.length - 2] as any).ma5
                ? '↑'
                : '↓'}
            </Typography>
            <Typography variant="caption">
              {(taiexData[taiexData.length - 1].exclusionValueMa5 as any).d}
              {(taiexData[taiexData.length - 1].exclusionValueMa5 as any).d >
              (taiexData[taiexData.length - 1].exclusionValueMa5 as any)['d+1']
                ? '↓'
                : '↑'}
            </Typography>
          </Stack>

          <Stack spacing={1} direction={'row'}>
            <Typography
              variant="caption"
              color={
                (taiexData[taiexData.length - 1] as any).ma10 >
                (taiexData[taiexData.length - 2] as any).ma10
                  ? 'success.main'
                  : 'error'
              }
            >
              ma10
              {(taiexData[taiexData.length - 1] as any).ma10 >
              (taiexData[taiexData.length - 1] as any).ma10
                ? '↑'
                : '↓'}
            </Typography>
            <Typography variant="caption">
              {(taiexData[taiexData.length - 1].exclusionValueMa10 as any).d}
              {(taiexData[taiexData.length - 1].exclusionValueMa10 as any).d >
              (taiexData[taiexData.length - 1].exclusionValueMa10 as any)['d+1']
                ? '↓'
                : '↑'}
            </Typography>
          </Stack>

          <Stack spacing={1} direction={'row'}>
            <Typography
              variant="caption"
              color={
                (taiexData[taiexData.length - 1] as any).ma20 >
                (taiexData[taiexData.length - 2] as any).ma20
                  ? 'success.main'
                  : 'error'
              }
            >
              ma20
              {(taiexData[taiexData.length - 1] as any).ma20 >
              (taiexData[taiexData.length - 2] as any).ma20
                ? '↑'
                : '↓'}
            </Typography>
            <Typography variant="caption">
              {(taiexData[taiexData.length - 1].exclusionValueMa20 as any).d}
              {(taiexData[taiexData.length - 1].exclusionValueMa20 as any).d >
              (taiexData[taiexData.length - 1].exclusionValueMa20 as any)['d+1']
                ? '↓'
                : '↑'}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
