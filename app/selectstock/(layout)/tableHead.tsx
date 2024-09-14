import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiTableHead from '@mui/material/TableHead';

export default function TableHead() {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell align="center">股票</TableCell>
        <TableCell align="center">K</TableCell>
        <TableCell align="center">股價</TableCell>
        <TableCell align="center">Action</TableCell>
        <TableCell align="center">評估</TableCell>
        <TableCell align="left">分數</TableCell>
        <TableCell align="left" colSpan={2}>
          其他
        </TableCell>
      </TableRow>
    </MuiTableHead>
  );
}
