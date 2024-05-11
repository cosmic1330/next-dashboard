import { Typography } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SWRConfig } from 'swr';
import { StocksType } from '../type';
import TableBodyRow from './tableBodyRow';

export default function Table({ stocks }: { stocks: StocksType[] }) {
  return (
    <SWRConfig>
      <TableContainer>
        <MuiTable>
          {(!stocks || stocks.length === 0) && (
            <caption style={{ textAlign: 'center', fontSize: '18px' }}>
              No Data
            </caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">股票</TableCell>
              <TableCell align="center">
                <Typography align="center">Strategy1</Typography>
                <Typography align="center">布林軌道縮口變開口</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography align="center">Strategy2</Typography>
                <Typography align="center">布林穿過中線</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography align="center">Strategy3</Typography>
                <Typography align="center">布林穿過底線站回</Typography>
                <Typography align="center">2紅K且不破前低</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography align="center">Strategy4</Typography>
                <Typography align="center">KD交叉</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography align="center">Strategy5</Typography>
                <Typography align="center">底部翻轉</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks &&
              stocks.map((stock, index) => (
                <TableBodyRow {...{ stock, index }} key={index} />
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </SWRConfig>
  );
}
