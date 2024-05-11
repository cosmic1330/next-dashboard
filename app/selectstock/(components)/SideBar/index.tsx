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
        <ListCentent />
      </Box>
      <Box textAlign="center"></Box>
    </StyledDrawer>
  );
}
