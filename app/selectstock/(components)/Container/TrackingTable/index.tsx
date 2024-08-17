'use client';
import { useTrackingList } from '@/store/zustand';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, useEffect } from 'react';
import TrackingForm from './form';
import TableBodyRow from './tableBodyRow';

export default function TrackingTable() {
  const { list, init } = useTrackingList();
  useEffect(() => init(), [init]);

  return (
    <Fragment>
      <TrackingForm />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell align="center">股票</TableCell>
              <TableCell align="center">股價</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">評估</TableCell>
              <TableCell align="center">注意</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(list.values()).map((data, index) => (
              <TableBodyRow key={index} data={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
