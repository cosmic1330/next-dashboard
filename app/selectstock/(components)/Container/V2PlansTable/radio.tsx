import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { V2Plans } from './types';

export default function Radios({
  plan,
  setPlan,
}: {
  plan: V2Plans;
  setPlan: Dispatch<SetStateAction<V2Plans>>;
}) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((event.target as HTMLInputElement).value as V2Plans);
  };

  return (
    <FormControl>
      <FormLabel>V2 Plans</FormLabel>
      <RadioGroup row onChange={handleRadioChange} value={plan}>
        {Object.entries(V2Plans).map(([key, value]) => (
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
