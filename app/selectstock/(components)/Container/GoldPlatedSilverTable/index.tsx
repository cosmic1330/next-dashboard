'use client';
import TableHead from '@/app/selectstock/(layout)/tableHead';
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
import TableContainer from '@mui/material/TableContainer';

import { Fragment, Suspense, lazy } from 'react';
import useQueryStock from '../../../../../hooks/useQueryStock';

const TableBodyProvider = lazy(() => import('./tableBodyProvider'));
export default function GoldPlatedSilverTable() {
  const { data: stocks, mutate } = useQueryStock();

  return (
    <Fragment>
      <Typography variant="h4" align="center">
        金包銀策略（適合用在下跌後&撐竿跳完，趨勢往長天期均線靠近）
      </Typography>
      <Box my={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            以六十分K的均線判斷，短天期均線在支撐以上，長天期均線以下。
          </AccordionSummary>
          <AccordionDetails>
            短天期: ma5, ma10, ma20
            <br />
            長天期: ma120, ma240
            <br />
            支撐: ma60
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
