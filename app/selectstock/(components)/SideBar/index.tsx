'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ListCentent from './ListCentent';
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
        <Typography variant="overline" px={2}>Slope Section 坡段</Typography>
        <ListCentent />
      </Box>
      <Box textAlign="left">
        <Typography variant="overline" px={2}>Day Trading 當沖</Typography>
      </Box>
      <Box textAlign="left">
        <Typography variant="overline" px={2}>Long-term Deposits 存股</Typography>
      </Box>
      <Box textAlign="center"></Box>
    </StyledDrawer>
  );
}
