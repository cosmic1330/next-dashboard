'use client';
import useControl from '@/app/backtest/(hooks)/useControl';
import { Button, CardContent, Card as MuiCard, styled } from '@mui/material';
import { useRef } from 'react';
import Detail, { DetailRef } from './detail';

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

export default function Control() {
  const detailRef = useRef<DetailRef>(null);

  const { context, handleRun, handleStop, intervalId } = useControl(detailRef);
  if (!context) return <div>no context</div>;

  return (
    <Card>
      <CardContent>
        {intervalId ? (
          <Button variant="outlined" size="small" onClick={handleStop}>
            Stop
          </Button>
        ) : (
          <Button variant="outlined" size="small" onClick={handleRun}>
            Run
          </Button>
        )}
      </CardContent>
      <Detail context={context} ref={detailRef} />
    </Card>
  );
}
