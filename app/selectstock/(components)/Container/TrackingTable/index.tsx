'use client';
import { useTrackingList } from '@/store/zustand';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment } from 'react';
import TableBodyRow from './tableBodyRow';

export default function TrackingTable() {
  const { list } = useTrackingList();
  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell align="center">股票</TableCell>
              <TableCell align="center">股價</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">正向</TableCell>
              <TableCell align="center">注意</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((str) => (
              <TableBodyRow {...{ str }} key={str} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
