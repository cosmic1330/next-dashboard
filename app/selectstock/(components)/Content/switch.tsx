import { FormControlLabel, Stack } from '@mui/material';
import MuiSwitch from '@mui/material/Switch';
import { useContext } from 'react';
import { SelectStockContext } from '../../(context)/selectStockContext';

export default function Switch() {
  const {
    stock_db_data_set,
    daily_db_data_set,
    setStockDbDateSet,
    setDailyDbDateSet,
    useDExclusionValue,
    setUseDExclusionValue,
  } = useContext(SelectStockContext);

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStockDbDateSet(event.target.checked);
  };

  const handleDailyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDailyDbDateSet(event.target.checked);
  };

  const handleExclusionValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUseDExclusionValue(event.target.checked);
  };

  return (
    <Stack gap={1}>
      <FormControlLabel
        control={
          <MuiSwitch checked={stock_db_data_set} onChange={handleStockChange} />
        }
        label="Use Stock Database Set"
        color="primary"
      />
      <FormControlLabel
        control={
          <MuiSwitch checked={daily_db_data_set} onChange={handleDailyChange} />
        }
        label="Use Daily Deal Database Set"
        color="primary"
      />
      <FormControlLabel
        control={
          <MuiSwitch
            checked={useDExclusionValue}
            onChange={handleExclusionValueChange}
          />
        }
        label="Use D Exclusion Value <盤中請用d-1>"
        color="primary"
      />
    </Stack>
  );
}
