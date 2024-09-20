'use client';
import TableHead from '@/app/selectstock/(layout)/tableHead';
import { Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { Fragment, Suspense, lazy } from 'react';
import useQueryStock from '../../../../../hooks/useQueryStock';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function ExperimentTable() {
  const { data: stocks, mutate } = useQueryStock();

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        實驗
      </Typography>
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
                  <TableBodyProvider {...{ stock }} />
                </Suspense>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
