'use client';
import { V2StocksMinimalResponseRow } from '@/app/api/taiwan-stock/v2/stocks/minimal/route';
import { useTrackingList } from '@/store/zustand';
import convertFullWidthToHalfWidth from '@/utils/convertFullWidthToHalfWidth';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useQueryOptions from './(hooks)/useQueryOptions';

export default function TrackingForm() {
  const { options } = useQueryOptions();
  const [value, setValue] = useState<V2StocksMinimalResponseRow | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { add } = useTrackingList();

  const onClick = async () => {
    if (!value) {
      toast.error('Stock Id is required');
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/taiwan-stock/v2/daily_deal/last/${value.stock_id}`,
      );
      const data = await response.json();

      let dateObject = new Date();
      let year = dateObject.getFullYear().toString();
      let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      let day = dateObject.getDate().toString().padStart(2, '0');
      let formattedDateString = year + month + day;
      const date = parseInt(formattedDateString);

      add({
        id: value.stock_id,
        date: date || 0,
        plan: '---',
        name: data['stock_name'],
        c: data['close_price'],
        listed: value.listed,
      });
      toast.success(`${value.stock_id} ${value.stock_name} added!`);
    } catch (e) {
      console.error(e);
      toast.error('Stock not found');
    }
    setValue(null);
    setInputValue('');
  };

  return (
    <Stack direction={'row'} spacing={2}>
      <Autocomplete
        onChange={(event: any, newValue: V2StocksMinimalResponseRow | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          const id = convertFullWidthToHalfWidth(newInputValue);
          setInputValue(id);
        }}
        disablePortal
        options={options ? options : []}
        autoHighlight
        sx={{
          width: 300,
          '& input': {
            bgcolor: 'transparent',
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        getOptionLabel={(option) => `${option.stock_id} ${option.stock_name}`}
        renderInput={(params) => <TextField {...params} label="Stock Id" />}
      />
      <Button onClick={onClick} variant="outlined" color="success">
        Add
      </Button>
    </Stack>
  );
}
