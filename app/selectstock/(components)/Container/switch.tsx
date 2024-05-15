import { FormControlLabel } from '@mui/material';
import MuiSwitch from '@mui/material/Switch';
import { useContext } from 'react';
import { SelectStockContext } from '../../(context)/selectStockContext';

export default function Switch() {
  const { db_data_set, setDbDateSet } = useContext(SelectStockContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDbDateSet(event.target.checked);
  }

  return (
    <FormControlLabel
      control={
        <MuiSwitch checked={db_data_set} onChange={handleChange} />
      }
      label="Use Database Set"
      color="primary"
    />
  );
}
