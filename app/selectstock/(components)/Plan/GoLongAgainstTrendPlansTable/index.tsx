'use client';
import TableHead from '@/app/selectstock/(layout)/tableHead';
import useQueryStock from '@/hooks/useQueryStock';
import { Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { Fragment, Suspense, lazy, useState } from 'react';
import Radios from './radio';
import { GoLongAgainstTrendPlans } from './types';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function GoLongAgainstTrendPlansTable() {
  const { data: stocks, mutate } = useQueryStock();
  const [plan, setPlan] = useState(GoLongAgainstTrendPlans.WilliamsNegativeTrend);

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        觀察反彈
      </Typography>
      <Typography variant="subtitle2" align="center">
        {"1. 不適合大盤大漲時使用[表示股票弱於大盤]"}
      </Typography>
      <Typography variant="subtitle2" align="center">
        {"2. 適合大盤平盤整理或大盤下跌"}
      </Typography>
      <Typography variant="subtitle1" align="center" mt={2}>
        {plan}
      </Typography>
      <Stack direction="column">
        <Radios {...{ plan, setPlan }} />
      </Stack>
      <Button variant="outlined" onClick={() => mutate()}>
        Query Data
      </Button>
      <TableContainer>
        <Table>
          {(!stocks || stocks.length === 0) && (
            <caption style={{ textAlign: 'center', fontSize: '18px' }}>
              No Data
            </caption>
          )}

          <TableHead />
          <TableBody>
            {stocks &&
              stocks.map((stock, index) => (
                <Suspense fallback={<></>} key={index}>
                  <TableBodyProvider {...{ stock, plan }} />
                </Suspense>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
