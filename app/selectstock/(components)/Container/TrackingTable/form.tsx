import { Button } from '@/app/dashboard/(components)/button';
import { useTrackingList } from '@/store/zustand';
import { Stack, TextField } from '@mui/material';
import { useRef } from 'react';

export default function TrackingForm() {
  const textRef = useRef(null);
  const { add } = useTrackingList();

  const onClick = async () => {
    const input = (textRef.current as any).value;
    const response = await fetch(
      `http://localhost:3000/api/taiwan-stock/v2/daily_deal/last/${input}`,
    );
    const data = await response.json();

    let dateObject = new Date();
    let year = dateObject.getFullYear().toString();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObject.getDate().toString().padStart(2, '0');
    let formattedDateString = year + month + day;
    const date = parseInt(formattedDateString);

    add({
      id: input,
      date: date || 0,
      plan: '---',
      name: data['stock_name'],
      c: data['close_price'],
    });
  };

  return (
    <Stack mb={2} direction={'row'} gap={2} alignItems={'center'}>
      <TextField required label="Stock Id" inputRef={textRef} />
      <Button onClick={onClick}>Add</Button>
    </Stack>
  );
}
