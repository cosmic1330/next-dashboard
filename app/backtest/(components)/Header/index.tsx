import { Box, Typography } from '@mui/material';
import { Header as StyleHeader } from '../../styles';
import Initialize from './Initialize';
export default function Header() {
  return (
    <StyleHeader>
      <Box
        sx={{
          paddingLeft: '20px',
          placeSelf: 'center start',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Grid&lsquo;s Backtest
        </Typography>
        <Typography variant="subtitle2" color="GrayText">
          Backtesting tool to assist selectstock plan
        </Typography>
      </Box>
      <Initialize />
    </StyleHeader>
  );
}
