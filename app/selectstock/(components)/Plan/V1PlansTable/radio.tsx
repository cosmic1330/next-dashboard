import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { V1Plans } from './types';

export default function Radios({
  plan,
  setPlan,
}: {
  plan: V1Plans;
  setPlan: Dispatch<SetStateAction<V1Plans>>;
}) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((event.target as HTMLInputElement).value as V1Plans);
  };

  return (
    <FormControl>
      <FormLabel>V1 Plans</FormLabel>
      <RadioGroup row onChange={handleRadioChange} value={plan}>
        {Object.entries(V1Plans).map(([key, value]) => (
          <FormControlLabel
            key={key}
            value={value}
            control={<Radio />}
            label={key}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
