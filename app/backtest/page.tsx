'use client';

import { useState } from 'react';
import Stocks from './(components)/Stocks';
import useBacktestContext from './(hooks)/useBacktestContext';
import { Button } from '@mui/material';
import Detail from './(components)/Control/detail';
import Control from './(components)/Control';
import { Main } from './styles';

export default function Page() {
  const { refresh } = useBacktestContext();
  const [id, setId] = useState('5434');

  return (
    <Main>
      <Button size="small" variant="outlined" onClick={() => refresh()}>
        Get New Context
      </Button>
      <Stocks />
      <Control />
    </Main>
  );
}
