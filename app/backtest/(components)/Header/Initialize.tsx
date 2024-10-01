'use client';
import { Box, Button } from '@mui/material';
import useBacktestContext from '../../(hooks)/useBacktestContext';

export default function Initialize() {
  const { refresh } = useBacktestContext();
  return (
    <Box
      sx={{
        alignSelf: 'start',
        justifySelf: 'end',
        padding: '20px',
      }}
    >
      <Button size="small" variant="contained" onClick={() => refresh()}>
        Initialize Context
      </Button>
    </Box>
  );
}
