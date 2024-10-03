import { StatusContext } from '@/app/backtest/(context)/status';
import { useBackTest } from '@/store/zustand';
import { Button } from '@mui/material';
import { useContext } from 'react';

export default function Init() {
  const { context } = useBackTest();
  const { setUpdateTrigger } = useContext(StatusContext);
  const handleInit = () => {
    context?.init();
    if (setUpdateTrigger) setUpdateTrigger((prev) => prev + 1);
  };
  return (
    <Button onClick={handleInit} variant="outlined" size="small">
      Init
    </Button>
  );
}
