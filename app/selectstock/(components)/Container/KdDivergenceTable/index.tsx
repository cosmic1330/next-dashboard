'use client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, Suspense, lazy } from 'react';
import useQueryStock from '../../../../../hooks/useQueryStock';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function KdDivergenceTable() {
  const { data: stocks, mutate } = useQueryStock();

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        KD負背離的標的
      </Typography>
      <Box my={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            注意一：找KD破低但股價未破低的股票
          </AccordionSummary>
          <AccordionDetails>
            破低以實棒低點為主，不能用引線低點。
          </AccordionDetails>
        </Accordion>
      </Box>
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
              <TableCell align="center">正向</TableCell>
              <TableCell align="left">黃金分割率</TableCell>
              <TableCell align="left">其他</TableCell>
            </TableRow>
          </TableHead>
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
