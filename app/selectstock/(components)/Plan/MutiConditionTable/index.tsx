'use client';
import useQueryStock from '@/hooks/useQueryStock';
import { Button, TableHead, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Fragment, Suspense, lazy } from 'react';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function MutiConditionTable() {
  const { data: stocks, mutate } = useQueryStock();

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        多指標綜合排名
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
