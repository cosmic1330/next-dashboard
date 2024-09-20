import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { GoLongAgainstTrendPlans } from './types';

export default function Radios({
  plan,
  setPlan,
}: {
  plan: GoLongAgainstTrendPlans;
  setPlan: Dispatch<SetStateAction<GoLongAgainstTrendPlans>>;
}) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((event.target as HTMLInputElement).value as GoLongAgainstTrendPlans);
  };

  return (
    <FormControl>
      <FormLabel>Sara Plans</FormLabel>
      <RadioGroup row onChange={handleRadioChange} value={plan}>
        {Object.entries(GoLongAgainstTrendPlans).map(([key, value]) => (
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
