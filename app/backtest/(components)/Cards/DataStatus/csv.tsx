import useCsv from '@/app/backtest/(hooks)/useCsv';
import { Button } from '@mui/material';

export default function Csv() {
  const { downloadCsv } = useCsv();
  return (
    <Button onClick={downloadCsv} variant="outlined" size="small">
      Export
    </Button>
  );
}
