'use client';
import { useBackTest } from '@/store/zustand';
import {
  CardContent,
  Card as MuiCard,
  Typography,
  styled,
} from '@mui/material';

export const Card = styled(MuiCard)`
  /* 手機裝置 (螢幕寬度 480px 至 767px) */
  @media screen and (min-width: 480px) and (max-width: 767px) {
    grid-column: auto / span 2;
  }
  /* 平板裝置 (豎向模式，螢幕寬度 768px 至 1023px) */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-column: auto / span 3;
  }
  /* 平板裝置 (橫向模式，螢幕寬度 1024px 至 1199px) */
  @media screen and (min-width: 1024px) and (max-width: 1199px) {
    grid-column: auto / span 2;
    grid-row: 2;
  }
`;

export default function Options() {
  const { context } = useBackTest();
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" color="ActiveBorder" gutterBottom>
          Context Options
        </Typography>
        <Typography variant="body1" color="ActiveBorder" gutterBottom>
          {`[ToDo]`}
        </Typography>
      </CardContent>
    </Card>
  );
}
