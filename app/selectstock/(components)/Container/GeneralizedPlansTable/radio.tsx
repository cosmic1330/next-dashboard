import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { GeneralizedPlans } from './types';

export default function Radios({
  plan,
  setPlan,
}: {
  plan: GeneralizedPlans;
  setPlan: Dispatch<SetStateAction<GeneralizedPlans>>;
}) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlan((event.target as HTMLInputElement).value as GeneralizedPlans);
  };

  return (
    <FormControl>
      <FormLabel>Generalized Plans</FormLabel>
      <RadioGroup row onChange={handleRadioChange} value={plan}>
        {Object.entries(GeneralizedPlans).map(([key, value]) => (
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
