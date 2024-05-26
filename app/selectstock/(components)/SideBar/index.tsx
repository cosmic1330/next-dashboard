'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ExpansionaryPolicyListCentent from './ExpansionaryPolicyListCentent';
import LongTermObservationListCentent from './LongTermObservationListCentent';
import OthersListCentent from './OthersListCentent';
import SlopeListCentent from './SlopeListCentent';
import { Divider, StyledDrawer, StyledHeader } from './styles';

export default function SideBar() {
  const [open, setOpen] = useState<boolean>(true);
  const handleOpen = () => {
    setOpen((pre) => !pre);
  };
  return (
    <StyledDrawer variant="permanent" open={open}>
      <StyledHeader direction={'row'} justifyContent={'center'} gap={2}>
        <IconButton color="inherit" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
        {open && (
          <Typography variant="h4" component="h4">
            MStock
          </Typography>
        )}
      </StyledHeader>
      <Divider />
      <Box textAlign="left">
        <Typography variant="caption" px={2}>
          Slope Section 坡段
        </Typography>
        <SlopeListCentent />
      </Box>
      <Box textAlign="left">
        <Typography variant="caption" px={2}>
          Long-term Observation 長期觀察
        </Typography>
        <LongTermObservationListCentent />
      </Box>
      <Box textAlign="left">
        <Typography variant="caption" px={2} >
          Expansionary Policy 寬鬆政策
        </Typography>
        <ExpansionaryPolicyListCentent />
      </Box>

      <Box textAlign="left">
        <Typography variant="caption" px={2}>
          Others 其他
        </Typography>
        <OthersListCentent />
      </Box>

      <Box textAlign="center"></Box>
    </StyledDrawer>
  );
}
