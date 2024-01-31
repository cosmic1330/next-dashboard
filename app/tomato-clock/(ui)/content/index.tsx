'use client';

import AddIcon from '@mui/icons-material/add';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import DialogComponent from '../dialog';
import TimeLine from './timeline';

const Button = styled(MuiButton)``;

export default function Content() {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpenDialog} variant="contained">
        Add new tasks
        <AddIcon />
      </Button>
      <TimeLine />
      <DialogComponent {...{ open, handleCloseDialog }} />
    </div>
  );
}
