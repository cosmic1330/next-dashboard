import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { SaraPlans } from './types';

export default function Radios({
  plan,
  setPlan,
}: {
  plan: SaraPlans;
  setPlan: Dispatch<SetStateAction<SaraPlans>>;
}) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((event.target as HTMLInputElement).value as SaraPlans);
  };

  return (
    <FormControl>
      <FormLabel>Sara Plans</FormLabel>
      <RadioGroup row onChange={handleRadioChange} value={plan}>
        {Object.entries(SaraPlans).map(([key, value]) => (
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
