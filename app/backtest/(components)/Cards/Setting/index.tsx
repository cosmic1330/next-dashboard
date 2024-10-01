'use client';
import { useBackTest } from '@/store/zustand';
import { dateFormat } from '@ch20026103/anysis';
import { Mode } from '@ch20026103/anysis/dist/esm/stockSkills/utils/dateFormat';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function Setting() {
  const { startDate, endDate, setStartDate, setEndDate } = useBackTest();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = dateFormat(e.target.value, Mode.StringToNumber);
    setStartDate(res);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = dateFormat(e.target.value, Mode.StringToNumber);
    setEndDate(res);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder">
          Setting
        </Typography>
        <Typography variant="body2">Date</Typography>
        <Box>
          <input
            type="date"
            onChange={handleStartDateChange}
            value={dateFormat(startDate, Mode.NumberToString)}
            // style={{ position: 'absolute', opacity: 0 }}
          />

          <input
            type="date"
            onChange={handleEndDateChange}
            value={dateFormat(endDate, Mode.NumberToString)}
            // style={{ position: 'absolute', opacity: 0 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
