'use client';
import TableHead from '@/app/selectstock/(layout)/tableHead';
import useQueryStock from '@/hooks/useQueryStock';
import { Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { Fragment, Suspense, lazy, useState } from 'react';
import Radios from './radio';
import { SaraPlans } from './types';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function SaraPlansTable() {
  const { data: stocks, mutate } = useQueryStock();
  const [plan, setPlan] = useState(SaraPlans.GoldPlatedSilverTable);

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        新式形態學的標的
      </Typography>
      <Typography variant="subtitle1" align="center">
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
