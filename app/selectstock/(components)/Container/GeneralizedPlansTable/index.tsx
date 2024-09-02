'use client';
import useQueryStock from '@/hooks/useQueryStock';
import { Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, Suspense, lazy, useState } from 'react';
import Radios from './radio';
import { GeneralizedPlans } from './types';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function GeneralizedPlansTable() {
  const { data: stocks, mutate } = useQueryStock();
  const [plan, setPlan] = useState(GeneralizedPlans.GoldenCross);

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        大範圍的標的
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
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">股票</TableCell>
              <TableCell align="center">股價</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">評估</TableCell>
              <TableCell align="left">威廉溫度計</TableCell>
              <TableCell align="left" colSpan={2}>
                其他
              </TableCell>
            </TableRow>
          </TableHead>
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