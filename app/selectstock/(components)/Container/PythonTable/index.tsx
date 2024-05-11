'use client';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, Suspense, lazy } from 'react';
import useQueryStock from './(hooks)/useQueryStock';

const TableBodyRow = lazy(() => import('./tableBodyRow'));
export default function PythonTable() {
  const { stocks, mutate } = useQueryStock();

  return (
    <Fragment>
      <Button onClick={() => mutate()}>Query</Button>
      <TableContainer>
        <Table>
          {(!stocks || stocks.length === 0) && (
            <caption style={{ textAlign: 'center', fontSize: '18px' }}>
              No Data
            </caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="center">股票</TableCell>
              <TableCell align="center">股價</TableCell>
              <TableCell align="center">KD / Macd</TableCell>
              <TableCell align="center">Ma</TableCell>
              <TableCell align="left">黃金分割率</TableCell>
              <TableCell align="left">其他</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks &&
              stocks.map((stock, index) => (
                <Suspense fallback={"Loading..."} key={index}>
                  <TableBodyRow {...{ stock, index }} />
                </Suspense>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
